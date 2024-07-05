import { createFakeUser } from '@/tests'
import { describe, expect, it, vi } from 'vitest'
import type { UserEntity } from '../entities'
import { UserRepository } from './user.repository'

describe('User Repository', () => {
  it('should be able to create a new user', async () => {
    const fakeUser = createFakeUser()

    const userRepository = new UserRepository()

    vi.spyOn(userRepository, 'create').mockResolvedValue(<UserEntity>{
      id: fakeUser.id,
    })

    const userCreated = await userRepository.create(fakeUser)

    expect(userCreated.id).toEqual(fakeUser.id)
  })
})
