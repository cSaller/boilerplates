import express from 'express'
import router from 'routes'

import {
  authMiddleware,
  errorHandlingMiddleware
} from 'middlewares'
import { NODE_ENV, PORT } from 'config'

const app = express()
app.use(express.json())

if (NODE_ENV === 'develop') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use(authMiddleware)

app.use(router)

app.use(errorHandlingMiddleware)

app.listen(PORT, () => { console.info(`App is listening on port ${PORT}`) })
