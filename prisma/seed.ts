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

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
      },
      {
        userId: 2,
        totalAmount: 0,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      pizzaId: 1,
      cartId: 1,
      userId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}
 
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Pizza" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
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