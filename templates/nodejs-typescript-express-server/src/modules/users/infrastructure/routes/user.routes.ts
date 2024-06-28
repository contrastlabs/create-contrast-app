import { Router } from 'express'
import { CreateUserController } from '../controllers'
import { CreateUserValidation } from '../validations'

const userRoutes = Router()

userRoutes.post('/', CreateUserValidation.make(), CreateUserController.make())

export { userRoutes }
