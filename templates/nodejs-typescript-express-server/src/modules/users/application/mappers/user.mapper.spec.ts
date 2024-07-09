import { describe, expect, it } from 'vitest'

import { createFakeUser } from '@/tests'
import { UserMapper } from './user.mapper'

describe('User Mapper', () => {
  it('should convert user entity to JSON', () => {
    const userMapper = new UserMapper()

    const fakeUser = createFakeUser()

    const userJSON = userMapper.toJSON(fakeUser)

    expect(userJSON).toEqual({
      id: fakeUser.id.toString(),
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
      createdAt: fakeUser.createdAt.toISOString(),
      updatedAt: null,
    })
  })

  it('should convert database user to user entity', () => {
    const userMapper = new UserMapper()

    const fakeUser = createFakeUser()

    const userEntity = userMapper.toDomain({
      id: fakeUser.id.toString(),
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
      created_at: fakeUser.createdAt.toISOString(),
      updated_at: null,
    })

    expect(userEntity).toEqual(fakeUser)
  })
})
