import prisma from "@/lib/config";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patientId = parseInt(searchParams.get("patientId"), 10);
    try {
      let classifications;
      let count;
      if(patientId){
        classifications = await prisma.dRClassification.findMany({
          where: { patientId: patientId},
          include: {
            physician: true, 
            patient: true,    
          },
        })
        count = await prisma.dRClassification.count({
          where: {patientId: patientId}
        })
      } else {
        classifications = await prisma.dRClassification.findMany({
          include: {
            physician: true, 
            patient: true,    
          },
        })
        count = await prisma.dRClassification.count()
      }
        return new Response(JSON.stringify({rows:classifications, count:count}), {
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
        const classification = await prisma.dRClassification.create({
            data: {
            eyeSide:body?.eyeSide,
            description:body?.description,
            physicianId:body?.physicianId,
            patientId:body?.patientId
            }
        })
        const message = "Test added successfully!"
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
  
  // id        Int      @id @default(autoincrement())
  // eyeSide      String?
  // severity      String?
  // description      String?
  // physician    Physician     @relation(fields: [physicianId], references: [id])
  // patient   Patient     @relation(fields: [patientId], references: [id])
  // physicianId  Int
  // patientId  Int
  // images    Image[] 
  // createdAt DateTime @default(now())
  // updatedAt DateTime @updatedAt
  // deletedAt DateTime?