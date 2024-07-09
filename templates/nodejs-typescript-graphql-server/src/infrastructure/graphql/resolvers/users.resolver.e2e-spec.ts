import type { Express } from 'express'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { createGraphQLServer } from '@/infrastructure/graphql/app'

describe('User Resolver', () => {
  let app: Express

  beforeEach(async () => {
    app = await createGraphQLServer()
  })

  it('users', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ users { name } }',
    })

    expect(response.status).toBe(200)
    expect(response.body.data.users).toHaveLength(2)
    expect(response.body.data.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
        }),
      ]),
    )
  })

  it('getUserById', async () => {
    const response = await request(app).post('/graphql').send({
      query: '{ getUserById(id: 1) { name } }',
    })

    expect(response.status).toBe(200)
    expect(response.body.data.getUserById).toEqual(
      expect.objectContaining({
        name: expect.any(String),
      }),
    )
  })
})
