import Joi from 'joi'

export const scheduleSchema = Joi.object({
  clientId: Joi.string()
    .guid()
    .required(),

  procedures: Joi.array().items(
    Joi.string().guid()
  )
    .min(1)
    .required(),

  date: Joi.date()
    .timestamp()
    .required()

}).options({ abortEarly: false })
