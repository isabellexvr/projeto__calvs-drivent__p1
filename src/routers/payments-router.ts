import { Router } from "express";
import { getTicketPaymentInfo } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .get("/", getTicketPaymentInfo)
  .post("/process",);

export { paymentsRouter };
