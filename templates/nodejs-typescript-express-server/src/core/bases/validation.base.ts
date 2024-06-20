import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'

import { ValidationError } from '@/core/errors'

export class ValidationBase {
  private schema: z.AnyZodObject

  constructor(schema: z.AnyZodObject) {
    this.schema = schema
  }

  async handle(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const schema = this.schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
    })

    if (!schema.success) {
      throw new ValidationError(schema.error.issues)
    }

    request.manager.setData(schema.data)

    next()
  }
}

export interface ValidationConfig {
  make(): ValidationBase['handle']
}

export function buildValidation(schema: z.AnyZodObject): ValidationConfig {
  function make(): ValidationBase['handle'] {
    const validation = new ValidationBase(schema)

    return validation.handle.bind(validation)
  }

  return {
    make,
  }
}
