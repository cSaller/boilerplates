import Joi from 'joi'

import { phoneRegex, cpfRegex } from './regexPatterns'
import { addressSchema } from './addressSchema'

export const clientSchema = Joi.object({
  firstName: Joi.string()
  .min(3)
  .max(30)
  .required(),

  surname: Joi.string()
  .min(3)
  .max(30)
  .required(),

  nickname: Joi.string()
  .min(3)
  .max(30),

  email: Joi.string()
  .email({ minDomainSegments: 2 })
  .required(),

  cpf: Joi.string()
    .pattern(new RegExp(cpfRegex))
    .required(),

  birthDate: Joi.date(),

  phone: Joi.string()
    .min(10)
    .max(11)
    .pattern(new RegExp(phoneRegex))
    .required(),

  address: addressSchema
}).options({ abortEarly: false })
