import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL must be set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
  
const tickets = [
  {
    title: "Ticket 1",
    content: "This is the content of Ticket 1 from database seed",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the content of Ticket 2 from database seed",
    status: "DONE" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the content of Ticket 3 from database seed",
    status: "IN_PROGRESS" as const,
  },
];

async function seedTickets() {
  await prisma.ticket.deleteMany();
  for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
  }
}

async function main() {
  await seedTickets();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
