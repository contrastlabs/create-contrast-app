import { v4 as uuid } from 'uuid'
import { describe, expect, it, vi } from 'vitest'

import { createUser } from '@/tests'
import type { UserEntity } from '../entities'
import { UserRepository } from './user.repository'

describe('User Repository', () => {
  it('should be able to create a new user', async () => {
    const id = uuid()

    const user = createUser({
      id,
    })

    vi.spyOn(UserRepository, 'create').mockResolvedValue(<UserEntity>{ id })

    const userCreated = await UserRepository.create(user)

    expect(userCreated.id).toEqual(id)
  })
})
