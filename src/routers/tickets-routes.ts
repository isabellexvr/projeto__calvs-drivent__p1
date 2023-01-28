import { Router } from "express";
import { getAllTicketTypes } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getAllTicketTypes)
  .get("/", );

export { ticketsRouter };
