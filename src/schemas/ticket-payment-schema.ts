import joi from "joi";

export const ticketPaymentSchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object({
    issuer: joi.string().required(),
    number: joi.number().precision(16).required(),
    name: joi.string().required(),
    expirationDate: joi.date().required(),
    cvv: joi.string().length(3).required()
  }).required()
});
