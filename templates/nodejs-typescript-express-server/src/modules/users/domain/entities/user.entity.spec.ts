import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { describe, expect, it } from 'vitest'

import { ValidationError } from '@/core/errors'
import { createFakeUser } from '@/tests'
import { UserEntity } from './user.entity'

describe('User Entity', () => {
  it('should be able to create a new user', async () => {
    const id = uuid()

    const user = UserEntity.create(
      {
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      id,
    )

    await user.encryptPassword()

    expect(user).toBeInstanceOf(UserEntity)
    expect(user.isPasswordEncrypted()).toBeTruthy()
    expect(user.id).toEqual(id)
  })

  it('should be able to reject the creation of a user with null, undefined, or invalid fields', () => {
    expect(() => {
      const user = UserEntity.create({
        name: null as any,
        email: 'invalid-email',
        password: undefined as any,
        createdAt: undefined as any,
      })

      user.validate()
    }).toThrow(ValidationError)
  })

  it('should be a change the user name', () => {
    const fakeUser = createFakeUser()

    const name = faker.internet.displayName()

    fakeUser.changeName(name)

    expect(fakeUser.name).toBe(name)
  })

  it('should be a change the user email', () => {
    const fakeUser = createFakeUser()

    const email = faker.internet.email()

    fakeUser.changeEmail(email)

    expect(fakeUser.email).toBe(email)
  })

  it('should be a change the user password', () => {
    const fakeUser = createFakeUser()

    const password = faker.internet.password()

    fakeUser.changePassword(password)

    expect(fakeUser.password).toBe(password)
  })
})
