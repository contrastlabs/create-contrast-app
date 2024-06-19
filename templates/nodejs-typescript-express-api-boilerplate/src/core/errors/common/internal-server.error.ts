import { ErrorBase } from '@/core/bases'

export class InternalServerError extends ErrorBase {
  constructor(data?: any) {
    super('Internal server error.', 'InternalServerError', 500, data)
  }
}