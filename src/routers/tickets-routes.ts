import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter.get("/types", findTicketsTypes);

export { ticketsRouter };
