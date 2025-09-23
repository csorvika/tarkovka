const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.item.deleteMany(); // üríti a táblát
  await prisma.item.createMany({
  data: [
    {
      name: "AK-47",
      price: 50000,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png"
    },
    {
      name: "M4A1",
      price: 120000,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/45/M4A1_ACOG.jpg"
    },
  ],
});

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
