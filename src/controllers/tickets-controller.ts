import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getAllTicketTypes(_req: Request, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getUserTicket(_req: Request, res: Response) {
  try {
    console.log("a");
  } catch (error) {
    console.log(error);
  }
}
