import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { EntityBase } from '@/core/bases'
import { ValidationError } from '@/core/errors'

interface UserProps {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date | null
}

export const UserFields = {
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional().nullable(),
}

export class UserEntity extends EntityBase<UserProps, string> {
  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date {
    return this.props.createdAt as Date
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
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

  async encryptPassword(): Promise<void> {
    this.props.password = await bcrypt.hash(this.props.password, 10)
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.props.password)
  }

  updated(): void {
    this.props.updatedAt = new Date()
  }

  private validate(): void {
    const validation = z.object(UserFields).safeParse({
      id: this.id,
      ...this.props,
    })

    if (!validation.success) {
      throw new ValidationError(validation.error.issues)
    }
  }

  static create(props: UserProps, id?: string): UserEntity {
    const user = new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id ?? uuid(),
    )

    user.validate()

    return user
  }

  static from(id: string, props: UserProps): UserEntity {
    return new UserEntity(props, id)
  }
}
