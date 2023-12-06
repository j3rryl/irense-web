import prisma from "@/lib/config";

export async function OPTIONS(request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
export async function GET(request) {
  const physicianId = Number(request.url.split("physicians/")[1]);
  const origin = request.headers.get("origin");
  
  try {
    
    const physician = await prisma.physician.findUnique({
      where: {
        id: physicianId,
      },
    });
    return new Response(JSON.stringify(physician), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  const physicianId = Number(request.url.split("physicians/")[1]);
  const origin = request.headers.get("origin");
  try {
    const body = await request.json();
    const physician = await prisma.physician.findUnique({
      where: {
        id: physicianId,
      },
    });    
    if (!physician) {
      return new Response(JSON.stringify({ error: "physician not found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }
    const updatedphysician = await prisma.physician.update({
      where: {
        id: physicianId,
      },
      data: body,
    });

    const message = "Record(s) updated successfully"
    return new Response(JSON.stringify({message}), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  const physicianId = Number(request.url.split("physicians/")[1]);
  const origin = request.headers.get("origin");

  try {
    const physician = await prisma.physician.findUnique({
      where: {
        id: physicianId,
      },
    });

    if (!physician) {
      return new Response(JSON.stringify({ error: "Physician not found!" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }

    await prisma.physician.delete({
      where: {
        id: physicianId,
      },
    });

    const message = "Record deleted successfully";
    return new Response(JSON.stringify({ message }), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } 
}
