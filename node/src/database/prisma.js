import { PrismaClient } from '@prisma/client'
import { NotFound } from 'helpers'

const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: {
      User: err => NotFound(err.message),
      Client: err => NotFound(err.message),
      Schedule: err => NotFound(err.message),
      Procedure: err => NotFound(err.message)
    }
  }
})

export default prisma
