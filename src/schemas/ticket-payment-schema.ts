import joi from "joi";

export const ticketPaymentSchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object({
    issuer: joi.string().required(),
    number: joi.number().required(),
    name: joi.string().required(),
    expirationDate: joi.date().required(),
    cvv: joi.string().required()
  }).required()
});
