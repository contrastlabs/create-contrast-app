import type { Request, Response } from 'express'

import { ControllerBase, buildController } from '@/core/bases'
import { CreateUserUseCase } from '@/modules/users/application/use-cases'

class Controller extends ControllerBase {
  async handle(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.manager.data.body

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({ name, email, password })

    response.status(201).json({ userId: user.id })
  }
}

export const CreateUserController = buildController(Controller)
