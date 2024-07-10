import { ErrorBase } from '@/core/bases'

export class ValidationError extends ErrorBase {
  constructor(details?: any) {
    super('Fields in need of attention.', 'ValidationError', 422, details)
  }
}
