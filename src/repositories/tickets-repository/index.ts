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
    data: params,
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

const ticketsRepository = {
  findAllTypes,
  findUsersTicket,
  postNewTicket
};

export default ticketsRepository;
