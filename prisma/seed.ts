import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Poker Face",
    email: "pokerface@conciso.io",
    tasks: {
      create: [
        {
          title: "Write an article",
          content:
            "We need a super dooper article about something. And we need to write it!",
          draft: false,
          inProgress: true,
        },
      ],
    },
  },
  {
    name: "Stromberg",
    email: "stromberg@conciso.de",
    tasks: {
      create: [
        {
          title: "Coaching Session - Women in a Workplace",
          content:
            "I need to take this session to be a better manager. After that sky's the limit.",
          completed: true,
          draft: false,
        },
      ],
    },
  },
  {
    name: "Der Streber",
    email: "streber@conciso.de",
    tasks: {
      create: [
        {
          title: "Check and Correct Excel calculation",
          content:
            "Standard procedure, which is checking Excel calculations and, as usual, correcting it.",
          draft: false,
          inProgress: true,
        },
        {
          title: "Make holiday plans!",
          content:
            "It's this time of the year that we should start to think about our holiday plans.",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // cleanup the existing database
  await prisma.task.deleteMany()
  await prisma.user.deleteMany()

  for (const data of userData) {
    const user = await prisma.user.create({
      data,
    });
    console.log(`Created user with id: ${user.id}`);
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
