import { prisma } from "@/config";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findUsersTicket() {
/*   return prisma.ticket.findUnique({
    
  }) */
}

const ticketsRepository = {
  findAllTypes,
};

export default ticketsRepository;
