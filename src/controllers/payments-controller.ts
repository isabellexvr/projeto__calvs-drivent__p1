import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { paymentsService } from "@/services/payments-services.ts";

export async function getTicketPaymentInfo(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  if(!ticketId) return res.status(httpStatus.BAD_REQUEST).send("nenhum id de ticket foi mandado");
  try {
    const ticket = await paymentsService.checkTicketPaymentInfo(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "invalidDataError") return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === "UnauthorizedError") return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}
