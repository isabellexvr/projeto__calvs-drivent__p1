import { Router } from "express";
import { getAllTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.get("/types", getAllTicketTypes);

export { ticketsRouter };
