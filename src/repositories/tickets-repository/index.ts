import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

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

async function postNewTicket(params: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  return prisma.ticket.create({
    data: params
  });
}

const ticketsRepository = {
  findAllTypes,
  findUsersTicket,
  postNewTicket
};

export default ticketsRepository;
