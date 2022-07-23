import jwt from "jsonwebtoken"

import { ACCESS_SECRET } from "config"
import { Unauthorized, InternalServerError } from 'helpers'

export const authMiddleware = (req, res, next) => {
  const pathsWithoutLogin = ["/v1/users/login", "/v1/users/signup", "/public"]
  if (pathsWithoutLogin.some((path) => path.includes(req.path))) {
    return next()
  }
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) {
    return Unauthorized('Token not provided')
  }

  try {
    jwt.verify(token, ACCESS_SECRET)
    return next()
  } catch (error) {
    if (error.message.includes("jwt malformed")) {
      return Unauthorized('Invalid token')
    }
    if (error.message.includes("jwt expired")) {
      return Unauthorized('Token expired')
    }
    console.error(error)
    return InternalServerError(error.message)
  }
}
