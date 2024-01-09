import prisma from "@/lib/config";
import { writeFile, access, mkdir } from "fs/promises";
const path = require("path");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patientId = parseInt(searchParams.get("patientId"), 10);
  const searchQuery = searchParams.get("query");
  try {
    let classifications;
    let count;
    if (patientId) {
      classifications = await prisma.dRClassification.findMany({
        where: { patientId: patientId },
        include: {
          physician: true,
          patient: true,
        },
      });
      count = await prisma.dRClassification.count({
        where: { patientId: patientId },
      });
    } else {
      if (searchQuery) {
        classifications = await prisma.dRClassification.findMany({
          where: {
            severity: {
              search: searchQuery,
            },
            eyeSide: {
              search: searchQuery,
            },
          },
          include: {
            physician: true,
            patient: true,
          },
        });
        count = classifications?.length;
      } else {
        classifications = await prisma.dRClassification.findMany({
          include: {
            physician: true,
            patient: true,
          },
        });
        count = await prisma.dRClassification.count();
      }
    }
    return new Response(
      JSON.stringify({ rows: classifications, count: count }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
export async function POST(request) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());

    const classification = await prisma.dRClassification.create({
      data: {
        eyeSide: body?.eyeSide,
        description: body?.description,
        physicianId: Number(body?.physicianId),
        patientId: Number(body?.patientId),
      },
    });

    const file = formData.get("image");
    if (file) {
      try {
        const response = await fetch(
          "https://backend-dr2.onrender.com/check_level",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.level) {
            let severity = "No DR";
            switch (result.level) {
              case 0:
                severity = "No DR";
                break;
              case 1:
                severity = "Mild";
                break;
              case 2:
                severity = "Moderate";
                break;
              case 3:
                severity = "Severe";
                break;
              case 4:
                severity = "Proliferative";
                break;
              default:
                severity = "No DR";
                break;
            }
            await prisma.dRClassification.update({
              where: {
                id: classification?.id,
              },
              data: {
                severity: severity,
              },
            });
          } else {
            console.error(result.error);
          }
        } else {
          console.error("Server response not okay");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
      const imageClassification = await prisma.image.create({
        data: {
          classificationId: classification?.id,
        },
      });
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const directoryPath = path.join(
          process.cwd(),
          `/public/uploads/classifications/${imageClassification?.id}/`
        );

        // Ensure the directory exists or create it
        try {
          await access(directoryPath);
        } catch (error) {
          if (error.code === "ENOENT") {
            // Directory doesn't exist, create it
            await mkdir(directoryPath, { recursive: true });
          } else {
            throw error;
          }
        }

        const filePath = path.join(directoryPath, file.name);
        await writeFile(filePath, buffer);
        const imagePath = `/uploads/classifications/${imageClassification?.id}/${file.name}`;
        await prisma.image.update({
          where: {
            id: imageClassification?.id,
          },
          data: {
            imagePath: imagePath,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }

    const message = "Test added successfully!";
    return new Response(JSON.stringify({ message }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
