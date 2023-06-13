import Joi from 'joi'

export const accessorySchema = Joi.object({
   name: Joi.string().required(),
   price: Joi.number().required(),
   materials: Joi.array().required(),
   images: Joi.array().required(),
   description: Joi.string().required(),
   categories: Joi.array().required()
})
