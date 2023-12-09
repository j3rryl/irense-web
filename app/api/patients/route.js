import prisma from "@/lib/config";
import { writeFile, access, mkdir } from 'fs/promises'
const path = require('path'); 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("query");
    try {
      let patients;
      let count;
      if(searchQuery){
        patients = await prisma.patient.findMany({
          where: {
                email: {
                  search: searchQuery,
                },
              
                firstName: {
                  search: searchQuery,
                },
              
                lastName: {
                  search: searchQuery,
                },
                phone: {
                  search: searchQuery,
                },
          },
        })
        count = patients?.length;
      } else {
        patients = await prisma.patient.findMany()
        count = await prisma.patient.count()
      }
        return new Response(JSON.stringify({rows:patients, count:count}), {
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
export async function POST(request) {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData.entries());

      if (body.hasOwnProperty('file')) {
          delete body.file;
        }
      if (body.hasOwnProperty('image')) {
          delete body.image;
        }
        const existingPatient = await prisma.patient.findUnique({
            where: { email: body?.email },
        });

        if (existingPatient) {
            const message = "Patient with this email is already in use!";
            return new Response(JSON.stringify({ message }), {
                headers: {
                    "Content-Type": "application/json",
                },
                status:400
            });
        }

        const patient = await prisma.patient.create({
            data: body
        })
        const file = formData.get('image');
        if (file) {
          try {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const directoryPath = path.join(process.cwd(), `/public/uploads/patients/${patient?.id}/`);

          // Ensure the directory exists or create it
          try {
            await access(directoryPath);
          } catch (error) {
            if (error.code === 'ENOENT') {
              // Directory doesn't exist, create it
              await mkdir(directoryPath, { recursive: true });
            } else {
              throw error;
            }
          }

          const filePath = path.join(directoryPath, file.name);
          await writeFile(filePath, buffer)
          const imagePath = `/uploads/patients/${patient?.id}/${file.name}`
          await prisma.patient.update({
            where: {
              id: patient?.id,
            },
            data: {
              image: imagePath
            },
          });
          } catch (error) {
            console.log(error);
          }
          
        }
        const message = "Patient added successfully!"
        return new Response(JSON.stringify({message}), {
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
  