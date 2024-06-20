import { ErrorBase } from '@/core/bases'

export class RouteNotFoundError extends ErrorBase {
  constructor() {
    super('Route not found.', 'RouteNotFoundError', 404)
  }
}
