import {
  BadRequest,
  userSchema,
  clientSchema,
  procedureSchema,
  scheduleSchema
} from 'helpers'


const validate = (schema, req, _, next) => {
  const validation = schema.validate(req.body)
  if (!validation.error) {
    return next()
  }
  return validationErrorSend(validation)
}

export const validationMiddleware = (req, res, next) => {
  const mainPath = req.baseUrl.split('/')[2]

  switch (mainPath) {
    case 'clients': {
      validate(clientSchema, req, res, next)
      break
    }
    case 'procedures': {
      validate(procedureSchema, req, res, next)
      break
    }
    case 'schedules': {
      validate(scheduleSchema, req, res, next)
      break
    }
    case 'users': {
      validate(userSchema, req, res, next)
      break
    }
  }
}

const validationErrorSend = validation => {
  if (validation.error.details.length === 1) {
    const field = validation.error.details[0].path
    return BadRequest(`Field '${field}' is invalid or malformatted.`)
  }

  const fields = []
  validation.error.details.map(error => fields.push(error.path))
  return BadRequest(`Fields '${fields}' are invalid or malformatted.`)
}
