import { Logger } from '@/core/utils'
import { database } from '../client'

export async function createUserSeed() {
  await database.connect()

  await database.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [
      'John Doe',
      'jhondoe@example.com',
      '$2a$10$6LBGUqaf1zy9dnxpne7wNO7k0QwZMS9YQjEQ2K.kx.PHzurUqL9vm', // test321
    ],
  )

  Logger.from('create-user.seed.ts').info('User created successfully.')
}
