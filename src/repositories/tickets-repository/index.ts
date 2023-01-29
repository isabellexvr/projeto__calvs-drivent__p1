import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findUsersTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
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

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: "PAID" }
  });
}

const ticketsRepository = {
  findAllTypes,
  findUsersTicket,
  postNewTicket,
  updateTicketStatus
};

export default ticketsRepository;
