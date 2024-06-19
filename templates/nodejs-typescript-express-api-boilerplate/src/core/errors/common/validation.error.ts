import { ErrorBase } from '@/core/bases'

export class ValidationError extends ErrorBase {
  constructor(data?: any) {
    super('Fields in need of attention.', 'ValidationError', 422, data)
  }
}
