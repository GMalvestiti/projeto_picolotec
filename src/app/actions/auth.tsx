"use server";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { signIn, signOut } from "@/app/auth";
import { sql } from "@vercel/postgres";

import { UserPostSchema } from "./schemas";
import { User } from "@/app/lib/definitions";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function signUp(formData: FormData) {
  const validatedFields = UserPostSchema.safeParse({
    name: formData.get("nome"),
    email: formData.get("email"),
    password: formData.get("senha"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos Faltando. Falha ao criar usuário.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const user = await getUser(email);
    if (user) {
      return {
        message: "[Erro]: Email já cadastrado.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    return {
      message: "[ERRO]: Falha ao criar usuário.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function logout() {
  const cookieStore = cookies();
  if (cookieStore.has("user_id")) {
    cookieStore.delete("user_id");
  }
  await signOut();
}
