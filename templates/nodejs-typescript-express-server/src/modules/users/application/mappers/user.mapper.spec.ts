import { describe, expect, it } from 'vitest'

import type { Database } from '@/infrastructure/database'
import { createUser } from '@/tests'
import { UserMapper } from './user.mapper'

describe('User Mapper', () => {
  it('should convert user entity to JSON', () => {
    const user = createUser()

    const userJSON = UserMapper.toJSON(user)

    expect(userJSON).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt.toISOString(),
      updatedAt: null,
    })
  })

  it('should convert database user to user entity', () => {
    const user = createUser()

    const databaseUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.createdAt.toISOString(),
      updated_at: null,
    } satisfies Database.User

    const userEntity = UserMapper.toDomain(databaseUser)

    expect(userEntity).toEqual(user)
  })
})
