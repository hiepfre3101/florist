import Joi from 'joi'

export const flowerSchema = Joi.object({
   name: Joi.string().required(),
   type: Joi.string().required(),
   price: Joi.number().required(),
   userId: Joi.string().required(),
   ingredients: Joi.array().required(),
   accsessories: Joi.array().required(),
   images: Joi.array().required(),
   description: Joi.string().required(),
   categories: Joi.array().required()
})
