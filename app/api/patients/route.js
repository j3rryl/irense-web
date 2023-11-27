import prisma from "@/lib/config";

export async function GET(request) {
    try {
        const patients = await prisma.patient.findMany()
        const count = await prisma.patient.count()
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
        const body = await request.json()
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
            data: {
            firstName:body?.firstName,
            lastName:body?.lastName,
            phone:body?.phone,
            email:body?.email
            }
        })
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
  