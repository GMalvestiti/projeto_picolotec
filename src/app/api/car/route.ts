import { NextRequest } from 'next/server';

import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let query = searchParams.get("query");

    let data;
    if (!query) {
      data = await sql`SELECT * FROM cars;`;
    } else {
      query = '%' + query + '%';
      data = await sql`
        SELECT * FROM cars
        WHERE description ILIKE ${query} OR make ILIKE ${query} OR model ILIKE ${query};
      `;
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
  } catch (error) {
    console.error("[ERROR]: Internal server error", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    });
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

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
  } catch (error) {
    console.error("[ERROR]: Internal server error", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    });
  }
}
