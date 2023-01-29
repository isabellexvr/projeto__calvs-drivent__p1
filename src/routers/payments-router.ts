import { Router } from "express";
import { getTicketPaymentInfo, postTicketPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .get("/", getTicketPaymentInfo)
  .post("/process", postTicketPayment);

export { paymentsRouter };
