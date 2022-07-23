import Joi from 'joi'

import { cepRegex } from './regexPatterns'

export const addressSchema = Joi.object({
  address1: Joi.string()
    .min(3)
    .max(30)
    .required(),

  address2: Joi.string()
    .optional()
    .allow(null, '')
    .min(3)
    .max(30),

  address3: Joi.string()
    .optional()
    .allow(null, '')
    .min(3)
    .max(30),

  number: Joi.number()
    .min(1)
    .max(10),

  cep: Joi.string()
    .pattern(new RegExp(cepRegex))
    .required(),

  alias: Joi.string()
    .optional()
    .allow(null, '')
    .min(3)
    .max(30)
})
