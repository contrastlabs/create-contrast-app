import type { UseCase } from '@/core/bases'
import type { CreateUserDTO } from '@/modules/users/application/dtos'
import { UserEntity } from '@/modules/users/domain/entities'
import { UserEmailAlreadyExists } from '@/modules/users/domain/errors'
import { UserRepository } from '@/modules/users/domain/repositories'

export class CreateUserUseCase
  implements UseCase<CreateUserDTO.Input, CreateUserDTO.Output>
{
  private readonly userRepository: UserRepository = new UserRepository()

  async execute(input: CreateUserDTO.Input): Promise<CreateUserDTO.Output> {
    const { name, email, password } = input

    const emailExists = await this.userRepository.existsByEmail(email)

    if (emailExists) {
      throw new UserEmailAlreadyExists()
    }

    const user = UserEntity.create({
      name,
      email,
      password,
    })

    await user.encryptPassword()

    const userCreated = await this.userRepository.create(user)

    return userCreated
  }
}
