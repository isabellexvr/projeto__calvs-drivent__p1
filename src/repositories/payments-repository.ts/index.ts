import { Enrollment } from "@prisma/client";
import { prisma } from "@/config";

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function getUserTicket(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    include: { Enrollment: true },
    where: {
      AND: [
        { id: ticketId },
        { Enrollment: { userId } }
      ]
    }
  });
}

async function getPaymentInfoByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function getTicketPrice(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { id: ticketId },
    select: {
      TicketType: { 
        select: { 
          price: true
        } }
    }
  });
  return ticket.TicketType.price;
}

type paymentData = {
  id: number,
  ticketId: number,
  value: number,
  cardIssuer: string, // VISA | MASTERCARD
  cardLastDigits: string,
  createdAt: Date,
  updatedAt: Date,
}

async function postPayment(data: Omit<paymentData, "id" | "createdAt" | "updatedAt">) {
  return prisma.payment.create({
    data
  });
}

const paymentsRepository = {
  getTicketById,
  getUserTicket,
  getPaymentInfoByTicketId,
  getTicketPrice,
  postPayment
};

export default paymentsRepository;
