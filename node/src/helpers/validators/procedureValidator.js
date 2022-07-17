import Joi from 'joi'

export const procedureSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(60)
    .required(),

  value: Joi.number()
    .min(1)
    .max(999)
    .required(),

  duration: Joi.number()
    .min(1)
    .max(999)
    .required()

}).options({ abortEarly: false })
