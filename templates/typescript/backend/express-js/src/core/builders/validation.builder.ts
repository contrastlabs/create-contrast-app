import type { z } from 'zod'

import { ValidationBase } from '@/core/bases'

interface ValidationConfig {
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
