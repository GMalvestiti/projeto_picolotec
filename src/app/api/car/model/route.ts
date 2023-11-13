import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const make = searchParams.get("query");
    const EXTERNAL_URL = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=model&where=search(make%2C%20%22${make}%22)&limit=-1`;
    const response = await fetch(EXTERNAL_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

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
