import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL must be set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const users = [
  {
    username: "user",
    email: "user@example.com",
    password: "password",
  },
  {
    username: "Jyoti",
    email: "jyotiogennavar31@gmail.com",
    password: "123456",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
    userId: "1",
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
    userId: "1",
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
    userId: "1",
  },
];

async function seedTickets() {

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const dbUsers = await prisma.user.createManyAndReturn({
    data: await Promise.all(
      users.map(async ({ password, ...user }) => ({
        ...user,
        passwordHash: await bcrypt.hash(password, 10),
      })),
    ),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });
}

async function main() {
  await seedTickets();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
