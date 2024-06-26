import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { EntityBase, type EntityProps } from '@/core/bases'
import { ValidationError } from '@/core/errors'

interface UserProps extends EntityProps {
  name: string
  email: string
  password: string
}

const UserFields = {
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional().nullable(),
}

export class UserEntity extends EntityBase<UserProps, string> {
  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  changeName(name: string): void {
    const validation = UserFields.name.optional().safeParse(name)

    if (!validation.success) {
      throw new ValidationError(validation.error.issues)
    }

    this.props.name = name
  }

  changeEmail(email: string): void {
    const validation = UserFields.email.optional().safeParse(email)

    if (!validation.success) {
      throw new ValidationError(validation.error.issues)
    }

    this.props.email = email
  }

  changePassword(password: string): void {
    const validation = UserFields.password.optional().safeParse(password)

    if (!validation.success) {
      throw new ValidationError(validation.error.issues)
    }

    this.props.password = password
  }

  isPasswordEncrypted(): boolean {
    return /^\$2[ayb]\$.{56}$/.test(this.props.password)
  }

  get #passwordSalt(): number {
    return 10
  }

  async encryptPassword(): Promise<void> {
    this.props.password = await bcrypt.hash(
      this.props.password,
      this.#passwordSalt,
    )
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.props.password)
  }

  validate(): void {
    const validation = z.object(UserFields).safeParse({
      id: this.id,
      ...this.props,
    })

    if (!validation.success) {
      throw new ValidationError(validation.error.issues)
    }
  }

  static create(props: UserProps, id?: string): UserEntity {
    return new UserEntity(props, id)
  }
}
