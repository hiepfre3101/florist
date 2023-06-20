import Joi from 'joi'

export const flowerSchema = Joi.object({
   name: Joi.string().required(),
   price: Joi.number().required(),
   images: Joi.array().required(),
   type: Joi.string().required(),
   description: Joi.string().required(),
   categories: Joi.array().required()
})
