import { Router } from "express";
import { getTicketPaymentInfo, postTicketPayment } from "@/controllers";
import { validateBody } from "@/middlewares";
import { ticketPaymentSchema } from "@/schemas/ticket-payment-schema";

const paymentsRouter = Router();

paymentsRouter
  .get("/", getTicketPaymentInfo)
  .post("/process", validateBody(ticketPaymentSchema), postTicketPayment);

export { paymentsRouter };
