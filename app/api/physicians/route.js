import prisma from "@/lib/config";
import bcrypt from "bcrypt";
import { writeFile, access, mkdir } from 'fs/promises'
const path = require('path'); 


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("query");

    try {
      let physicians;
      let count;
        if(searchQuery){
          physicians = await prisma.physician.findMany({
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
          count = physicians?.length;
        } else {
          physicians = await prisma.physician.findMany()
          count = await prisma.physician.count()
        } 
      return new Response(JSON.stringify({rows:physicians, count:count}), {
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
        
        const existingphysician = await prisma.physician.findUnique({
            where: { email: body?.email },
        });

        if (existingphysician) {
            const message = "Physician with this email is already in use!";
            return new Response(JSON.stringify({ message }), {
                headers: {
                    "Content-Type": "application/json",
                },
                status:400
            });
        }
        const physician = await prisma.physician.create({
            data: {
            firstName:body?.firstName,
            lastName:body?.lastName,
            phone:body?.phone,
            gender:body?.gender,
            role:body?.role,
            email:body?.email,
            password: await bcrypt.hash(body?.password, 10)
            }
        })
        const file = formData.get('image');
        if (file) {
          try {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const directoryPath = path.join(process.cwd(), `/public/uploads/profile/${physician?.id}/`);

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
          const imagePath = `/uploads/profile/${physician?.id}/${file.name}`
          await prisma.physician.update({
            where: {
              id: physician?.id,
            },
            data: {
              image: imagePath
            },
          });
          } catch (error) {
            console.log(error);
          }
          
        }

        
        const message = "Physician added successfully!"
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
  