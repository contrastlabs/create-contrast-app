import { type Database, database } from '@/infrastructure/database'
import { UserMapper } from '@/modules/users/application/mappers'
import type { UserEntity } from '../entities'

export class UserRepository {
  static async create(user: UserEntity): Promise<UserEntity> {
    await database.connect()

    const [userCreated] = await database.query<[Database.CreateUserOutput]>(
      `
      INSERT INTO users (id, name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING id
      `,
      [user.id, user.name, user.email, user.password],
    )

    return UserMapper.toDomain(userCreated)
  }

  static async existsByEmail(email: string): Promise<boolean> {
    await database.connect()

    const [user] = await database.query<[Database.FindUserByEmailOutput]>(
      'SELECT id FROM users WHERE email = $1',
      [email],
    )

    return !!user
  }
}
