import { describe, expect, it, vi } from 'vitest'

import type { UserEntity } from '@/modules/users/domain/entities'
import { UserEmailAlreadyExists } from '@/modules/users/domain/errors'
import { UserRepository } from '@/modules/users/domain/repositories'
import { createFakeUser } from '@/tests'
import { CreateUserUseCase } from './create-user.use-case'

vi.mock('@/modules/users/domain/repositories/user.repository', () => ({
  UserRepository: vi.fn().mockReturnValue({
    create: vi.fn(),
    existsByEmail: vi.fn(),
  }),
}))

describe('Create User Use Case', () => {
  it('should be able to create a new user', async () => {
    const fakeUser = createFakeUser()

    await fakeUser.encryptPassword()

    const userRepository = new UserRepository()

    vi.mocked(userRepository.existsByEmail).mockResolvedValue(false)

    vi.mocked(userRepository.create).mockResolvedValue(<UserEntity>{
      id: fakeUser.id,
    })

    const createUserUseCase = new CreateUserUseCase()

    const userCreated = await createUserUseCase.execute({
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
    })

    expect(userCreated.id).toBe(fakeUser.id)
    expect(userRepository.existsByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUser = createFakeUser()

    const userRepository = new UserRepository()

    vi.mocked(userRepository.existsByEmail).mockResolvedValue(true)

    const createUserFakeUseCase = new CreateUserUseCase()

    await expect(
      createUserFakeUseCase.execute({
        name: fakeUser.name,
        email: fakeUser.email,
        password: fakeUser.password,
      }),
    ).rejects.toThrow(UserEmailAlreadyExists)
    expect(userRepository.existsByEmail).toHaveBeenCalledTimes(1)
  })
})
