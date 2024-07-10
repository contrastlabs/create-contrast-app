import type { NextFunction, Request, Response } from 'express'

import { MiddlewareBase } from '@/core/bases'
import { buildMiddleware } from '@/core/builders'

type Data = Record<string, any>

interface AuthenticatedData {
  id: string
}

class RequestManager {
  data: Data

  authenticated: AuthenticatedData

  setData(data: Data): this {
    this.data = data

    return this
  }

  setAuthenticated(authenticated: AuthenticatedData): this {
    this.authenticated = authenticated

    return this
  }
}

declare global {
  namespace Express {
    interface Request {
      manager: RequestManager
    }
  }
}

class Middleware extends MiddlewareBase {
  async handle(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    request.manager = new RequestManager()

    next()
  }
}

export const RequestManagerMiddleware = buildMiddleware(Middleware)
