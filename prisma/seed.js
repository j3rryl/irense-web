const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const jeremy = await prisma.physician.upsert({
    where: { email: 'jmunroe@strathmore.edu' },
    update: {},
    create: {
        firstName: 'Jeremy',
        lastName: 'Munroe',
        phone: '0723457890',
        status: 'active',
        gender: 'Male',
        image: '/images/download.jpg',
        email: 'jmunroe@strathmore.edu',
        password: await bcrypt.hash('123', 10), 
    },
  })
  console.log({ jeremy })
}
main()
  .then(async () => {
    console.log("Seeding completed successfully!");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })