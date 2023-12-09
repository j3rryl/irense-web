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
  const patientId = Number(request.url.split("patients/")[1]);
  const origin = request.headers.get("origin");
  try {
    
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    return new Response(JSON.stringify(patient), {
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
  const patientId = Number(request.url.split("patients/")[1]);
  const origin = request.headers.get("origin");
  try {
    const body = await request.json();
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });    
    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }
    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId,
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
  const patientId = Number(request.url.split("patients/")[1]);
  const origin = request.headers.get("origin");

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found!" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }

    // Delete the directory if needed
    try {
      const directoryPath = path.join(process.cwd(), `/public/uploads/patients/${patient?.id}`);
      await rm(directoryPath, { recursive: true });
    } catch (error) {
      console.error('Error deleting directory:', error);
    }

    await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });

    const message = "Patient deleted successfully";
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
