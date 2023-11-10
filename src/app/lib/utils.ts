"use server";

export async function returnResponse(content: any, status: number, headers?: any) {
  if (headers) {
    return new Response(JSON.stringify(content), {
      status: status,
      headers: headers,
    });
  }

  return new Response(JSON.stringify(content), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
