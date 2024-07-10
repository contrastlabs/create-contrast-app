import { database } from '@/infrastructure/database'
import { UserMapper } from '@/modules/users/application/mappers'
import type { UserEntity } from '../entities'

export class UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    await database.connect()

    const [userCreated] = await database.query(
      `
      INSERT INTO users (id, name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING id
      `,
      [user.id, user.name, user.email, user.password],
    )

    const userMapper = new UserMapper()

    return userMapper.toDomain(userCreated)
  }

  async existsByEmail(email: string): Promise<boolean> {
    await database.connect()

    const [user] = await database.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    )

    return !!user
  }
}
