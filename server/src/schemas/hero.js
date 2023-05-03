import Joi from "joi";

export const heroSchema = Joi.object({
  title: Joi.string().min(3).max(15).required(),
  link: Joi.string().required(),
  image: Joi.string().required(),
  desc: Joi.string().min(50).max(160).required(),
});
