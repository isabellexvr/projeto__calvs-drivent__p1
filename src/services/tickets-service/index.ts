import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, invalidDataError } from "@/errors";
import { TicketStatus } from "@prisma/client";

type TicketType = {
  id: number,
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  createdAt: Date,
  updatedAt: Date,
}

type Ticket = {
  id: number,
  status: string, //RESERVED | PAID
  ticketTypeId: number,
  enrollmentId: number,
  TicketType: {
    id: number,
    name: string,
    price: number,
    isRemote: boolean,
    includesHotel: boolean,
    createdAt: Date,
    updatedAt: Date,
  },
  createdAt: Date,
  updatedAt: Date,
}

async function getAllTicketTypes(): Promise<TicketType[]> {
  return await ticketsRepository.findAllTypes();
}

async function getTicketByUser(enrollmentId: number) {
  const ticket = await ticketsRepository.findUsersTicket(enrollmentId);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  const status: TicketStatus = "RESERVED";
  const data = {
    enrollmentId,
    ticketTypeId,
    status
  };
  const postedTicket = await ticketsRepository.postNewTicket( data );
  if(!postTicket) throw invalidDataError(["enrollmentId", "ticketTypeId"]);
  return postedTicket;
}

const ticketsService = {
  getAllTicketTypes,
  getTicketByUser,
  postTicket
};

export default ticketsService;
