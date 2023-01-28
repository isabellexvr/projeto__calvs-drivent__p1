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

async function getAllTicketTypes(): Promise<TicketType[]> {
  return await ticketsRepository.findAllTypes();
}

const ticketsService = {
  getAllTicketTypes,
};

export default ticketsService;
