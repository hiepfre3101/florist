import Joi from "joi";

export const bouquetSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  ingredients:Joi.array().required(),
  images: Joi.array().required(),
  description: Joi.string().required(),
  categories: Joi.array().required(),
});