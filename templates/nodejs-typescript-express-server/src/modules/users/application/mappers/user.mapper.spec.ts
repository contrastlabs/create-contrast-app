import { describe, expect, it } from 'vitest'

import { createFakeUser } from '@/tests'
import { UserMapper } from './user.mapper'

describe('User Mapper', () => {
  it('should convert user entity to JSON', () => {
    const userMapper = new UserMapper()

    const userCreated = createFakeUser()

    const userJSON = userMapper.toJSON(userCreated)

    expect(userJSON).toEqual({
      id: userCreated.id.toString(),
      name: userCreated.name,
      email: userCreated.email,
      password: userCreated.password,
      createdAt: userCreated.createdAt.toISOString(),
      updatedAt: null,
    })
  })

  it('should convert database user to user entity', () => {
    const userMapper = new UserMapper()

    const userCreated = createFakeUser()

    const userEntity = userMapper.toDomain({
      id: userCreated.id.toString(),
      name: userCreated.name,
      email: userCreated.email,
      password: userCreated.password,
      created_at: userCreated.createdAt.toISOString(),
      updated_at: null,
    })

    expect(userEntity).toEqual(userCreated)
  })
})
