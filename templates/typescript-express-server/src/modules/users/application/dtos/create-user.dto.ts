import type { UserEntity } from '@/modules/users/domain/entities'

export namespace CreateUserDTO {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = UserEntity
}
