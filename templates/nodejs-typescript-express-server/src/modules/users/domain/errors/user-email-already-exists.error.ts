import { ErrorBase } from '@/core/bases'

export class UserEmailAlreadyExists extends ErrorBase {
  constructor() {
    super('Email already exists.', 'UserEmailAlreadyExists', 409)
  }
}
