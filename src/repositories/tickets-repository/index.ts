import { prisma } from "@/config";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findUsersTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findAllTypes,
  findUsersTicket
};

export default ticketsRepository;
