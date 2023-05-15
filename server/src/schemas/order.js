import Joi from "joi";

export const orderSchema = Joi.object({
  total: Joi.number().required(),
  user: Joi.string().required(),
  products: Joi.array().required(),
});
