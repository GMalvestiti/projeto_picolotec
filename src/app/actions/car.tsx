"use server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { CarMake, CarModel } from "@/app/lib/interfaces";
import { sql } from "@vercel/postgres";

import { CarDeleteSchema, CarPostSchema, CarPutSchema } from "./schemas";

const BASE_URL = process.env.BASE_URL;

export async function getCarsData(query: string) {
  noStore();
  try {
    const BASE_URL = process.env.BASE_URL;

    const cookieStore = cookies();
    const userId = cookieStore.get("user_id")
      ? cookieStore.get("user_id")
      : undefined;

    if (userId === undefined) {
      return [];
    }

    /*let endpoint;
    if (query == "") {
      endpoint = `${BASE_URL}/api/car`;
    } else {
      endpoint = `${BASE_URL}/api/car?query=${query}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `[ERRO] Falha ao buscar dados. Status: ${response.status}`
      );
    }*/

    let data;
    if (query.length == 0) {
      data = await sql`SELECT * FROM cars WHERE user_id = ${userId.value};`;
    } else {
      query = "%" + query + "%";
      data = await sql`
        SELECT * FROM cars
        WHERE user_id = ${userId.value} AND (description ILIKE ${query} OR make ILIKE ${query} OR model ILIKE ${query});
      `;
    }

    data = data.rows;

    return data;
  } catch (error) {
    console.error("[ERROR]: An error occurred while fetching cars data", error);
    return [];
  }
}

export async function getCarData(uuid: string) {
  noStore();
  try {
    const BASE_URL = process.env.BASE_URL;

    const endpoint = `${BASE_URL}/api/car?uuid=${uuid}`;

    const response = await fetch(endpoint /*, { cache: 'no-store' }*/);

    if (!response.ok) {
      throw new Error(
        `[ERRO] Falha ao buscar dados. Status: ${response.status}`,
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
      (item: CarModel) => item.model,
    );
    const uniqueModelsSet = new Set(modelsArray);
    const uniqueModelsArray = Array.from(uniqueModelsSet);
    return uniqueModelsArray;
  } catch (error) {
    console.error(
      "[ERROR]: An error occurred while fetching car models",
      error,
    );
    return ["erro"];
  }
}

export async function postCar(formData: FormData) {
  // Validação utilizando zod
  const validation = CarPostSchema.safeParse({
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

  const cookieStore = cookies();
  const userId = cookieStore.get("user_id")
    ? cookieStore.get("user_id")
    : undefined;

  if (userId == undefined) {
    return {
      message: "[ERRO]: Falha ao adicionar veículo.",
    };
  }

  try {
    await sql`
      INSERT INTO cars (user_id, description, make, model, cost)
      VALUES (${userId.value}, ${description}, ${make}, ${model}, ${cost})
    `;
  } catch (error) {
    return {
      message: "[ERRO]: Falha ao adicionar veículo.",
    };
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
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
    /*await fetch(`${BASE_URL}/api/car?uuid=${uuid}`, {
      method: "PUT",
      body: JSON.stringify({ id, description, make, model, cost }),
    });*/
    await sql`
      UPDATE cars
      SET description = ${description}, make = ${make}, model = ${model}, cost = ${cost}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error("[ERRO]: Erro ao tentar atualizar carro.", error);
  }

  revalidatePath("/dashboard/veiculos");
  redirect("/dashboard/veiculos");
}

export async function deleteCar(formData: FormData) {
  const validation = CarDeleteSchema.safeParse({
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
