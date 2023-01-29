import { Router } from "express";
import { getAllTicketTypes, getUserTicket, ticketPost } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas/ticket-schema";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/tickets", getUserTicket)
  .post("/tickets", validateBody(createTicketSchema), ticketPost);

export { ticketsRouter };
