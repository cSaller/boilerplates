import jwt from "jsonwebtoken"

import { ACCESS_SECRET, ACCESS_EXPIRES } from "config"

export const generateTokens = (dataToEncrypt) => {
  return {
    token: jwt.sign(dataToEncrypt, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
  }
}

export const verifyToken = (token) => jwt.verify(token, ACCESS_SECRET)
