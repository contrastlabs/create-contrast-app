import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { describe, expect, it, vi } from 'vitest'

import { UserEntity } from '@/modules/users/domain/entities'
import { UserEmailAlreadyExists } from '@/modules/users/domain/errors'
import { UserRepository } from '@/modules/users/domain/repositories'
import { createUser } from '@/tests'
import { CreateUserUseCase } from './create-user.use-case'

describe('Create User Use Case', () => {
  it('should be able to create a new user', async () => {
    const id = uuid()
    const name = faker.internet.displayName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const user = createUser({
      id,
      name,
      email,
      password,
    })

    await user.encryptPassword()

    vi.spyOn(UserRepository, 'existsByEmail').mockResolvedValue(false)
    vi.spyOn(UserRepository, 'create').mockResolvedValue(user)

    const createUserUseCase = new CreateUserUseCase()

    const userCreated = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    expect(userCreated).toBeInstanceOf(UserEntity)
    expect(userCreated.id).toBe(id)
    expect(userCreated.isPasswordEncrypted()).toBeTruthy()
    expect(UserRepository.existsByEmail).toHaveBeenCalledTimes(1)
    expect(UserRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new user with an existing email', async () => {
    vi.spyOn(UserRepository, 'existsByEmail').mockResolvedValue(true)

    const name = faker.internet.displayName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const createUserUseCase = new CreateUserUseCase()

    try {
      await createUserUseCase.execute({
        name,
        email,
        password,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(UserEmailAlreadyExists)
      expect(error).toHaveProperty('message', 'Email already exists.')
      expect(UserRepository.existsByEmail).toHaveBeenCalledTimes(1)
    }
  })
})
