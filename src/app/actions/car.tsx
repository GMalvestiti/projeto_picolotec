"use server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { z } from "zod";

import { CarMake, CarModel } from "@/app/lib/interfaces";

const BASE_URL = process.env.BASE_URL;

const CarPutSchema = z.object({
  id: z.string(),
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

export async function getCarData(uuid: string) {
  noStore();
  try {
    const BASE_URL = process.env.BASE_URL;

    const endpoint = `${BASE_URL}/api/car?uuid=${uuid}`;

    const response = await fetch(endpoint /*, { cache: 'no-store' }*/);

    if (!response.ok) {
      throw new Error(
        `[ERRO] Falha ao buscar dados. Status: ${response.status}`
      );
    }

    let data = await response.json();
    data = data.rows;

    return data;
  } catch (error) {
    console.error("[ERROR]: An error occurred while fetching cars data", error);
    return [];
  }
}

export async function getMakes(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/car/make`);

    if (!response.ok) {
      throw new Error("Failed to fetch car makes");
    }

    const data = await response.json();
    const makesArray: string[] = data.results.map((item: CarMake) => item.make);
    const uniqueMakesSet = new Set(makesArray);
    const uniqueMakesArray = Array.from(uniqueMakesSet);

    return uniqueMakesArray;
  } catch (error) {
    console.error("[ERROR]: An error occurred while fetching car makes", error);
    return ["erro"];
  }
}

export async function getModels(query: string): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/car/model?query=${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch car models");
    }

    const data = await response.json();
    const modelsArray: string[] = data.results.map(
      (item: CarModel) => item.model
    );
    const uniqueModelsSet = new Set(modelsArray);
    const uniqueModelsArray = Array.from(uniqueModelsSet);
    return uniqueModelsArray;
  } catch (error) {
    console.error(
      "[ERROR]: An error occurred while fetching car models",
      error
    );
    return ["erro"];
  }
}

export async function putCar(uuid: string, formData: FormData) {
  const validation = CarPutSchema.safeParse({
    id: uuid,
    description: formData.get("description"),
    make: formData.get("make"),
    model: formData.get("model"),
    cost: formData.get("cost"),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "[Erro]: Falha ao editar veículo.",
    };
  }

  const { id, description, make, model, cost } = validation.data;

  try {
    await fetch(`${BASE_URL}/api/car?uuid=${uuid}`, {
      method: "PUT",
      body: JSON.stringify({ id, description, make, model, cost }),
    });
    /*await sql`
      UPDATE cars
      SET description = ${description}, make = ${make}, model = ${model}, cost = ${cost}
      WHERE id = ${id};
    `;*/
  } catch (error) {
    console.error("[ERRO]: Erro ao tentar atualizar carro.", error);
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
}
