import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  if ((await prisma.contest.count()) === 0) {
    await prisma.contest.create({
      data: {
        name: `Seeded contest ${new Date().toISOString()}`,
      },
    });
  }

  console.log(`Seeding finished.`);
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
