import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterEach, describe, expect, it } from 'vitest'

import { database } from '@/infrastructure/database'
import { app } from '@/infrastructure/http/app'

describe('Create User Controller', () => {
  afterEach(async () => {
    await database.query('DELETE FROM users')
  })

  it('/users (POST)', async () => {
    const response = await request(app).post('/users').send({
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('userId')
  })
})
