import { Router } from 'express'
import { CreateUserController } from '../controllers'
import { CreateUserValidation } from '../validations'

const userRoutes = Router()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             name: Jhon Doe
 *             email: 'jhondoe@example.com'
 *             password: 'jhondoe123'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       401:
 *         $ref: '#/components/responses/401'
 *       422:
 *         $ref: '#/components/responses/422'
 *       500:
 *         $ref: '#/components/responses/500'
 */
userRoutes.post('/', CreateUserValidation.make(), CreateUserController.make())

export { userRoutes }
