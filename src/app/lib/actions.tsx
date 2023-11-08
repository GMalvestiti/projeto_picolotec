"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sql } from "@vercel/postgres";

const CarSchema = z.object({
  description: z.string({
    invalid_type_error: "Por favor, informe uma descrição.",
  }),
  make: z.string({
    invalid_type_error: "Por favor, informe a marca.",
  }),
  model: z.string({
    invalid_type_error: "Por favor, informe o modelo.",
  }),
  cost: z.coerce
    .number()
    .gt(0, { message: "Por favor, informe um valor maior que 0." }),
});

const DeleteSchema = z.object({
  uuid: z.string({
    invalid_type_error: "Por favor, informe o UUID.",
  }),
});

export async function addVeiculo(formData: FormData) {
  // Validação utilizando zod
  const validation = CarSchema.safeParse({
    description: formData.get("description"),
    make: formData.get("make"),
    model: formData.get("model"),
    cost: formData.get("cost"),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Campos faltando. Falha ao adicionar veículo.",
    };
  }

  const { description, make, model, cost } = validation.data;

  try {
    await sql`
      INSERT INTO cars (description, make, model, cost)
      VALUES (${description}, ${make}, ${model}, ${cost})
    `;
  } catch (error) {
    return {
      message: "[ERRO]: Falha ao adicionar veículo.",
    };
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
}

export async function getCarsData(query: string) {
  noStore();
  try {
    let data;
    console.log(query);
    if (query == "") {
      data = await sql`SELECT * FROM cars;`;
    } else {
      query = "%" + query + "%";
      data = await sql`
        SELECT * FROM cars
        WHERE description ILIKE ${query} OR make ILIKE ${query} OR model ILIKE ${query};
      `;
    }

    console.log(data);

    data = data.rows;

    return data;
  } catch (error) {
    console.error("[ERROR]: An error occurred while fetching cars data", error);
    return [];
  }
}

export async function deleteCars(formData: FormData) {
  const validation = DeleteSchema.safeParse({
    uuid: formData.get("uuid"),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "[ERRO]: UUID faltando.",
    };
  }

  const { uuid } = validation.data;

  try {
    if (uuid) {
      await sql`
        DELETE FROM cars
        WHERE id = ${uuid};
      `;
    }
  } catch (error) {
    console.error("[ERRO]: Erro ao tentar deletar carro", error);
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
}
