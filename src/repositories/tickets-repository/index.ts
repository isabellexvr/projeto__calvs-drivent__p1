import { prisma } from "@/config";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findAllTypes,
};

export default ticketsRepository;
