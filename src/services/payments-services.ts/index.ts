import { invalidDataError, notFoundError, unauthorizedError } from "@/errors";
import enrollmentsService from "../enrollments-service";
import paymentsRepository from "@/repositories/payments-repository.ts";

async function checkTicketPaymentInfo(ticketId: number | null, userId: number) {
  if (!ticketId) throw invalidDataError(["ticketId"]);
  await checkTicketExistence(ticketId);
  const ticket = await checkIfTicketBelongsToUser(ticketId, userId);
  return ticket;
}

async function checkTicketExistence(ticketId: number) {
  const ticket = await paymentsRepository.getTicketById(ticketId);
  if(!ticket) throw notFoundError();
  return ticket;
}

async function checkIfTicketBelongsToUser(ticketId: number, userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const ticket = await paymentsRepository.getUserTicket(ticketId, enrollment.id);
  if(!ticket) throw unauthorizedError();
  return ticket;
}

const paymentsService = {
  checkTicketPaymentInfo
};

export { paymentsService };

