import type { Mapper } from '@/core/bases'
import { isNullOrUndefined, isUndefined } from '@/core/utils'
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
      id: user?.id ?? undefined,
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      password: user?.password ?? undefined,
      createdAt: user?.createdAt?.toISOString() ?? undefined,
      updatedAt: user?.updatedAt?.toISOString() ?? null,
    }
  }

  toDomain(raw: Database.User): UserEntity {
    return UserEntity.from(raw.id, {
      name: raw?.name,
      email: raw?.email,
      password: raw?.password,
      createdAt: isUndefined(raw?.created_at)
        ? undefined
        : new Date(raw?.created_at),
      updatedAt: isNullOrUndefined(raw?.updated_at)
        ? null
        : new Date(raw?.updated_at),
    })
  }
}
