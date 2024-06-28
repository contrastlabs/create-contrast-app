import type { Mapper } from '@/core/bases'
import type { Database } from '@/infrastructure/database'
import { UserEntity } from '@/modules/users/domain/entities'

export interface UserJSON {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string | null
}

export class UserMapper implements Mapper {
  toJSON(user: UserEntity): UserJSON {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt?.toISOString() ?? null,
    }
  }

  toDomain(user: Partial<Database.User>): UserEntity {
    return UserEntity.create(
      {
        name: user.name as string,
        email: user.email as string,
        password: user.password as string,
        createdAt: new Date(user?.created_at as string),
        updatedAt: user.updated_at ? new Date(user.updated_at) : null,
      },
      user.id,
    )
  }

  static from() {
    return new UserMapper()
  }

  static toJSON(user: UserEntity) {
    return UserMapper.from().toJSON(user)
  }

  static toDomain(user: Partial<Database.User>) {
    return UserMapper.from().toDomain(user)
  }
}
