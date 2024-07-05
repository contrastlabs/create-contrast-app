import { ErrorBase } from '@/core/bases'

export class InternalServerError extends ErrorBase {
  constructor(details?: any) {
    super('Internal server error.', 'InternalServerError', 500, details)
  }
}
