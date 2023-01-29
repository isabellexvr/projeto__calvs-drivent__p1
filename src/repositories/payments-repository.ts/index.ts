import { prisma } from "@/config";

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function getUserTicket(ticketId: number, enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      AND: [
        { 
          id: ticketId
        },
        { 
          enrollmentId
        }]
    }
  });
}

const paymentsRepository = {
  getTicketById,
  getUserTicket
};

export default paymentsRepository;
