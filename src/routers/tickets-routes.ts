import { Router } from "express";
import { getAllTicketTypes, getUserTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/tickets", getUserTicket)
  .post("/tickets");

export { ticketsRouter };
