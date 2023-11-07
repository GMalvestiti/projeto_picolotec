/*
  const data = {
    message: "Hello, World!"
  }
  
  const statusCode = 200;

  const response = new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
*/

export async function GET() {
  const data = {
    message: "Hello, World!",
  };

  const statusCode = 200;

  const response = new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
