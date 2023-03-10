import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository.ts";
import ticketsRepository from "@/repositories/tickets-repository";

async function checkTicketPaymentInfo(ticketId: number | null, userId: number) {
  if (!ticketId) throw invalidDataError(["ticketId"]);
  await checkTicketExistence(ticketId);
  await checkIfTicketBelongsToUser(ticketId, userId);
}

async function checkTicketExistence(ticketId: number) {
  const ticket = await paymentsRepository.getTicketById(ticketId);

  if(!ticket) throw notFoundError();
  return ticket;
}

async function checkIfTicketBelongsToUser(ticketId: number, userId: number) {
  const ticket = await paymentsRepository.getUserTicket(ticketId, userId);
  if(!ticket) throw unauthorizedError();
  return ticket;
}

async function getPaymentInfo(ticketId: number) {
  const paymentInfo = await paymentsRepository.getPaymentInfoByTicketId(ticketId);
  return paymentInfo;
}

type Card = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
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

async function postTicketPayment(ticketId: number, cardData: Card) {
  const value = await paymentsRepository.getTicketPrice(ticketId);
  const data: Omit<paymentData, "id" | "createdAt" | "updatedAt"> = {
    ticketId,
    value,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4)
  };
  const paymentInfo = await paymentsRepository.postPayment(data);
  await ticketsRepository.updateTicketStatus(ticketId);
  return paymentInfo;
}

const paymentsService = {
  checkTicketPaymentInfo,
  checkIfTicketBelongsToUser,
  checkTicketExistence,
  getPaymentInfo,
  postTicketPayment
};

export { paymentsService };
