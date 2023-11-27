
export async function GET(request) {
    const data = {rows:[],count:11};
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  