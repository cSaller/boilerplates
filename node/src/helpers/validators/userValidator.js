import Joi from 'joi'

import { phoneRegex, cpfRegex, cepRegex, passwordRegex } from './regexPatterns'
import { addressSchema } from './addressSchema'

export const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp(passwordRegex))
    .required(),

  name: Joi.string()
    .min(3)
    .max(60)
    .required(),

  birthDate: Joi.date(),

  phone: Joi.string()
    .min(10)
    .max(11)
    .pattern(new RegExp(phoneRegex))
    .required(),

  cpf: Joi.string()
    .pattern(new RegExp(cpfRegex))
    .required(),

  address: addressSchema
}).options({ abortEarly: false })
