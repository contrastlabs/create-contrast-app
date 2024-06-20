import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { describe, expect, it } from 'vitest'

import { ValidationError } from '@/core/errors'
import { createUser } from '@/tests'
import { UserEntity } from './user.entity'

describe('User Entity', () => {
  it('should be able to create a new user', async () => {
    const id = uuid()
    const createdAt = new Date()

    const user = createUser({
      id,
      createdAt,
    })

    await user.encryptPassword()

    expect(user).toBeInstanceOf(UserEntity)
    expect(user.isPasswordEncrypted()).toBeTruthy()
    expect(user.id).toEqual(id)
    expect(user.createdAt).toEqual(createdAt)
  })

  it('should be able to reject the creation of a user with null, undefined, or invalid fields', () => {
    expect(() => {
      const user = UserEntity.create({
        name: null as any,
        email: 'invalid-email',
        password: undefined as any,
      })

      user.validate()
    }).toThrow(ValidationError)
  })

  it('should be a change the user name', () => {
    const user = createUser()

    const name = faker.internet.displayName()

    user.changeName(name)

    expect(user.name).toBe(name)
  })

  it('should be a change the user email', () => {
    const user = createUser()

    const email = faker.internet.email()

    user.changeEmail(email)

    expect(user.email).toBe(email)
  })

  it('should be a change the user password', () => {
    const user = createUser()

    const password = faker.internet.password()

    user.changePassword(password)

    expect(user.password).toBe(password)
  })
})
