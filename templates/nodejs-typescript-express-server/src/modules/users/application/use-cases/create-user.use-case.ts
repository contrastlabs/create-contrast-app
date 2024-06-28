import type { UseCase } from '@/core/bases'
import type { CreateUserDTO } from '@/modules/users/application/dtos'
import { UserEntity } from '@/modules/users/domain/entities'
import { UserEmailAlreadyExists } from '@/modules/users/domain/errors'
import { UserRepository } from '@/modules/users/domain/repositories'

export class CreateUserUseCase
  implements UseCase<CreateUserDTO.Input, CreateUserDTO.Output>
{
  async execute(input: CreateUserDTO.Input): Promise<CreateUserDTO.Output> {
    const { name, email, password } = input

    const emailExists = await UserRepository.existsByEmail(email)

    if (emailExists) {
      throw new UserEmailAlreadyExists()
    }

    const user = UserEntity.create({
      name,
      email,
      password,
    })

    await user.encryptPassword()

    user.validate()

    const userCreated = await UserRepository.create(user)

    return userCreated
  }
}
