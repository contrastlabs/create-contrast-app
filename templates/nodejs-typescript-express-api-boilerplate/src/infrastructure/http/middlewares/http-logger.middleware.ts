import type { NextFunction, Request, Response } from 'express'

import { MiddlewareBase, buildMiddleware } from '@/core/bases'
import { logger } from '../server'

class Middleware extends MiddlewareBase {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, httpVersionMajor, httpVersionMinor } = request

    const ipAddress =
      request.ip || request.get('x-forwarded-for') || request.get('x-real-ip')

    const httpVersion = `HTTP/${httpVersionMajor}.${httpVersionMinor}`

    response.on('finish', () => {
      const { statusCode } = response

      const message = [
        ipAddress,
        method,
        originalUrl,
        httpVersion,
        statusCode,
      ].join(' | ')

      logger.info(message)
    })

    return next()
  }
}

export const HttpLoggerMiddleware = buildMiddleware(Middleware)
