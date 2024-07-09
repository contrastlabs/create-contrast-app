import { describe, expect, it, vi } from 'vitest'

import { database } from '@/infrastructure/database/client'
import { createFakeUser } from '@/tests'
import { UserRepository } from './user.repository'

vi.mock('@/infrastructure/database/client', () => ({
  database: {
    query: vi.fn(),
  },
}))

describe('User Repository', () => {
  it('should be able to create a new user', async () => {
    const fakeUser = createFakeUser()

    await fakeUser.encryptPassword()

    const userRepository = new UserRepository()

    vi.mocked(database.query).mockResolvedValueOnce([{ id: fakeUser.id }])

    const userCreated = await userRepository.create(fakeUser)

    expect(userCreated.id).toEqual(fakeUser.id)
  })
})
