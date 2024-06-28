import { faker } from '@faker-js/faker'

import { UserEntity } from '@/modules/users/domain/entities'

interface UserOverrides {
  id?: string
  name?: string
  email?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export function createUser(overrides?: UserOverrides): UserEntity {
  return UserEntity.create(
    {
      name: overrides?.name ?? faker.internet.displayName(),
      email: overrides?.email ?? faker.internet.email(),
      password: overrides?.password ?? faker.internet.password(),
      createdAt: overrides?.createdAt,
      updatedAt: overrides?.updatedAt,
    },
    overrides?.id,
  )
}
