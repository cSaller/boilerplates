import { Router } from 'express'

import userRoutes from './usersRoutes'

const router = Router()
const api = Router()

api.use('/users', userRoutes)

router.use('/v1', api)

export default router
