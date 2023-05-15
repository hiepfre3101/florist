import Joi from "joi";

export const typeSchema = Joi.object({
  name: Joi.string().required(),
  subCategories: Joi.array(),
  products: Joi.array(),
});
