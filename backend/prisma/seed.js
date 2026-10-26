const prisma = require("../src/prisma")

async function seed() {
  
  await prisma.cookLog.deleteMany()
  await prisma.recipe.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      id: "1",
      name: "test",
      email: "test@gmail.com",
    },
  })

  const osh = await prisma.recipe.create({
    data: {
      title: "Osh",
      ingredients: "guruch\nsabzi\ngo'sht\npiyoz\nzira",
      steps: "1. Go'shtni qovuring\n2. Sabzi va piyoz qo'shing\n3. Guruchni solib damlang",
      imageUrl: "https://example.com/osh.jpg",
      prepTime: 90,
      userId: user.id,
    },
  })

  await prisma.recipe.create({
    data: {
      title: "Lag'mon",
      ingredients: "cho'zma xamir\ngo'sht\nsabzavotlar",
      steps: "1. Xamirni pishiring\n2. Qaylani tayyorlang\n3. Aralashtirib torting",
      prepTime: 60,
      userId: user.id,
    },
  })

  await prisma.cookLog.create({
    data: {
      recipeId: osh.id,
      userId: user.id,
      cookedAt: new Date(),
      rating: 5,
      note: "Juda mazali chiqdi",
    },
  })

  console.log("Seed tugadi ")
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })