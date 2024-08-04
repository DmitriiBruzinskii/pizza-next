import { Prisma, PrismaClient } from "@prisma/client";
import { categories, ingredients, products } from './constants';

const prisma = new PrismaClient();

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generatePizza = (productId: number, type: number, size: number) => {
  return {
    productId,
    size,
    type,
    price: randomNumber(190, 600),
    carbs: randomNumber(10, 30),
    fats: randomNumber(5, 15),
    kcal: randomNumber(180, 300),
    proteins: randomNumber(20, 45),
    weight: randomNumber(400, 650),
  };
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Alice',
        email: 'alice@mail.ru',
        phone: '+79999999999',
        role: 'USER',
      },
      {
        fullName: 'ggg',
        email: 'alikeeee@mail.ru',
        phone: '+7999999',
        role: 'ADMIN',
      }
    ]
  });

  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });

  await prisma.pizza.createMany({
    data: [
      generatePizza(1, 1, 20),
      generatePizza(1, 2, 30),
      generatePizza(1, 3, 40),

      generatePizza(2, 1, 20),
      generatePizza(2, 2, 30),
      generatePizza(2, 3, 40),

      generatePizza(3, 1, 20),
      generatePizza(3, 2, 30),
      generatePizza(3, 3, 40),
    ],
  });
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