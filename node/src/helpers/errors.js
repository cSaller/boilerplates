export const Deleted = (message = 'Successfully deleted', res = null) => {
  const error = {
    name: 'Deleted',
    message,
    deleted: true,
    statusCode: 200
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const BadRequest = (message = 'The json data is malformed', res = null) => {
  const error = {
    name: 'BadRequest',
    message,
    statusCode: 400,
    errorCode: 400
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const Unauthorized = (message = 'Incorrect username or password', res = null) => {
  const error = {
    name: 'Unauthorized',
    message,
    statusCode: 401,
    errorCode: 401
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const Forbidden = (message = 'Lack of permission to access this resource', res = null) => {
  const error = {
    name: 'Forbidden',
    message,
    statusCode: 403,
    errorCode: 403
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const NotFound = (message = 'The requested resource could not be found', res = null) => {
  const error = {
    name: 'NotFound',
    message,
    statusCode: 404,
    errorCode: 404
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const InternalServerError = (message = 'The API did something wrong', res = null) => {
  const error = {
    name: 'InternalServerError',
    message,
    statusCode: 500,
    errorCode: 500
  }
  if (res) return res.status(error.statusCode).json(error)
  throw error
}

export const getErrorByStatusCode = (statusCode, message) => {
  switch (statusCode) {
    case 400:
      return BadRequest(message)
    case 401:
      return Unauthorized(message)
    case 403:
      return Forbidden(message)
    case 404:
      return NotFound(message)
    case 500:
    default:
      return InternalServerError(message)
  }
}

export const getErrorByName = (name, message) => {
  switch (name) {
    case 'Deleted':
      return Deleted(message)
    case 'BadRequest':
      return BadRequest(message)
    case 'Unauthorized':
      return Unauthorized(message)
    case 'Forbidden':
      return Forbidden(message)
    case 'NotFound':
      return NotFound(message)
    case 'InternalServerError':
    default:
      return InternalServerError(message)
  }
}
