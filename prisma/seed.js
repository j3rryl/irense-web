const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const jeremy = await prisma.physician.upsert({
    where: { email: 'jmunroe@strathmore.edu' },
    update: {},
    data: {
        firstName: 'Jeremy',
        lastName: 'Munroe',
        phone: '0723457890',
        status: 'active',
        gender: 'Male',
        email: 'jmunroe@strathmore.edu',
        password: await bcrypt.hash('password123', 10), 
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