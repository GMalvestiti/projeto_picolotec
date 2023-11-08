"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { sql } from '@vercel/postgres';

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
