const EXTERNAL_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make&limit=-1";

export async function GET() {
  try {
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
