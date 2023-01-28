import ticketsRepository from "@/repositories/tickets-repository";

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

async function getTicketByUser() {
  //return await
}

const ticketsService = {
  getAllTicketTypes,
};

export default ticketsService;
