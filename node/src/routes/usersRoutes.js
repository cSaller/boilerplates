import { Router } from 'express'

import User from 'controllers/usersController'
import { roleMiddleware, validationMiddleware } from 'middlewares'

const router = Router()

router.post('/signup', validationMiddleware, roleMiddleware, User.create)
router.get('/:id', roleMiddleware, User.get)
router.patch('/', roleMiddleware, User.update)
router.delete('/', roleMiddleware, User.remove)

router.post('/login', User.login)

export default router
