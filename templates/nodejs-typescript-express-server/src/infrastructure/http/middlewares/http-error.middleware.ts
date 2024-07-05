import type { NextFunction, Request, Response } from 'express'

import { ErrorBase } from '@/core/bases'
import { MiddlewareBase } from '@/core/bases'
import { buildMiddleware } from '@/core/builders'
import { InternalServerError } from '@/core/errors'

class Middleware extends MiddlewareBase {
  async handle(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    if (error instanceof ErrorBase) {
      return response.status(error.status).json({ error: error.toJSON() })
    }

    const interalServerError = new InternalServerError({
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    console.error(error)

    return response
      .status(interalServerError.status)
      .json({ error: interalServerError.toJSON() })
  }
}

export const HttpErrorMiddleware = buildMiddleware(Middleware)
