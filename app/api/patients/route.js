import prisma from "@/lib/config";

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
            data: body
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
  