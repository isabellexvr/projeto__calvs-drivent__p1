import joi from "joi";

export const createTicketSchema = joi.object({
  ticketTypeId: joi.number().required()
});
