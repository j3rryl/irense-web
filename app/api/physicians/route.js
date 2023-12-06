import prisma from "@/lib/config";
import bcrypt from "bcrypt";

export async function GET(request) {
    try {
        const physicians = await prisma.physician.findMany()
        const count = await prisma.physician.count()
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
        const body = await request.json()
        const existingphysician = await prisma.physician.findUnique({
            where: { email: body?.email },
        });

        if (existingphysician) {
            const message = "physician with this email is already in use!";
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
            email:body?.email,
            password: await bcrypt.hash(body?.password, 10)
            }
        })
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
  