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

async function getPaymentInfoByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

const paymentsRepository = {
  getTicketById,
  getUserTicket,
  getPaymentInfoByTicketId
};

export default paymentsRepository;
