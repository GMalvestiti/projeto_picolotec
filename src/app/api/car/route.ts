import { NextRequest, NextResponse } from "next/server";

import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let query = searchParams.get("query");
    let uuid = searchParams.get("uuid");

    let data;
    if (!query && !uuid) {
      data = await sql`SELECT * FROM cars;`;
    } else if (!query) {
      data = await sql`
        SELECT * FROM cars
        WHERE id = ${uuid};
      `;
    } else {
      query = "%" + query + "%";
      data = await sql`
        SELECT * FROM cars
        WHERE description ILIKE ${query} OR make ILIKE ${query} OR model ILIKE ${query};
      `;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[ERROR]: Internal server error", error);

    return NextResponse.json(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { id, description, make, model, cost } = await request.json();

  if (!id || !description || !make || !model || !cost)
    return NextResponse.json({ message: "[ERRO] Dados faltando" });

  try {
    const operation = await sql`
      UPDATE cars
      SET description = ${description}, make = ${make}, model = ${model}, cost = ${cost}
      WHERE id = ${id};
    `;

    return NextResponse.json({ message: "Updated car" },{ status: 200 });
  } catch (error) {
    console.error("[ERROR]: Internal server error", error);

    return NextResponse.json(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    let data;
    if (uuid) {
      data = await sql`
        DELETE FROM cars
        WHERE id = ${uuid};
      `;
    }

    return NextResponse.json(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("[ERROR]: Internal server error", error);
    return NextResponse.json(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
