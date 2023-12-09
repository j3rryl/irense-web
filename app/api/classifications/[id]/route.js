import prisma from "@/lib/config";
import { rm } from 'fs/promises'
const path = require('path');


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
  const classificationId = Number(request.url.split("classifications/")[1]);
  const origin = request.headers.get("origin");
  
  try {
    
    const classification = await prisma.dRClassification.findUnique({
      where: {
        id: classificationId,
      },
      include: {
        physician: true, 
        patient: true,    
      },
    });
    return new Response(JSON.stringify(classification), {
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
  const classificationId = Number(request.url.split("classifications/")[1]);
  const origin = request.headers.get("origin");
  try {
    const body = await request.json();
    const classification = await prisma.dRClassification.findUnique({
      where: {
        id: classificationId,
      },
    });    
    if (!classification) {
      return new Response(JSON.stringify({ error: "Classification not found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }
    const updatedclassification = await prisma.dRClassification.update({
      where: {
        id: classificationId,
      },
      data: body,
    });

    const message = "Test updated successfully"
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
  const classificationId = Number(request.url.split("classifications/")[1]);
  const origin = request.headers.get("origin");

  try {
    const classification = await prisma.dRClassification.findUnique({
      where: {
        id: classificationId,
      },
    });

    if (!classification) {
      return new Response(JSON.stringify({ error: "Test not found!" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }

    // Delete the directory if needed
    try {
      // await prisma.image.delete({
      //   where: {
      //     classificationId: classificationId,
      //   },
      // });
      const directoryPath = path.join(process.cwd(), `/public/uploads/classifications/${classification?.id}`);
      await rm(directoryPath, { recursive: true });
    } catch (error) {
      console.error('Error deleting directory:', error);
    }
    await prisma.dRClassification.delete({
      where: {
        id: classificationId,
      },
    });

    const message = "Test deleted successfully";
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
