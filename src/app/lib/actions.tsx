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
  try {
    const BASE_URL = process.env.BASE_URL;

    let endpoint;
    if (query == "") {
      endpoint = `${BASE_URL}/api/car`;
    } else {
      endpoint = `${BASE_URL}/api/car?query=${query}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`[ERRO] Falha ao buscar dados. Status: ${response.status}`);
    }

    let data = await response.json();
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
    const BASE_URL = process.env.BASE_URL;

    await fetch(`${BASE_URL}/api/car?uuid=${uuid}`, {
      method: "DELETE",
    });

  } catch (error) {
    console.error("[ERRO]: Erro ao tentar deletar carro.", error);
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
}
