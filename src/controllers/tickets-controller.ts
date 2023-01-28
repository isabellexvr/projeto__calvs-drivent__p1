import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";

export async function getAllTicketTypes(_req: Request, res: Response) {
  try {
    const ticketTypes = await ticketsService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

    const ticket = await ticketsService.getTicketByUser(enrollment.id);
    console.log(ticket);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
