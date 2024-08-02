import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Alice',
        email: 'alice@mail.ru',
        password: '123456',
        role: 'USER',
      },
      {
        fullName: 'ggg',
        email: 'alikeeee@mail.ru',
        password: '123456',
        role: 'ADMIN',
      }
    ]
  })
}
 
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();

  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });