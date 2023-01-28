import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

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

async function getTicketByUser(enrollmentId: number ) {
  const ticket =  await ticketsRepository.findUsersTicket(enrollmentId);
  console.log(ticket);
  if(!ticket) throw notFoundError();
  return ticket;
}

const ticketsService = {
  getAllTicketTypes,
  getTicketByUser
};

export default ticketsService;
