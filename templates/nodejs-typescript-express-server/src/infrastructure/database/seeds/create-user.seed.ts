import { Logger } from '@/core/utils'
import { database } from '../client'

export async function createUserSeed() {
  await database.connect()

  const [userExists] = await database.query(
    'SELECT id FROM users WHERE email = $1',
    ['jhondoe@example.com'],
  )

  if (userExists) {
    Logger.from('create-user.seed.ts').info('User already exists.')

    process.exit(0)
  }

  await database.query(
    'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
    [
      'd07f2216-de87-4796-aa4c-2a358a224424',
      'John Doe',
      'jhondoe@example.com',
      '$2a$10$pEqzB49zfcvOs5Yu9rFx7.Kyw4iU4uBQgNxk4kC0dvJNLtLxv2Mz6', // jhondoe123
    ],
  )

  Logger.from('create-user.seed.ts').info('User created successfully.')

  process.exit(0)
}
