import { z } from 'zod'

import { buildValidation } from '@/core/bases'
import { UserFields } from '@/modules/users/domain/entities'

export const CreateUserValidation = buildValidation(
  z.object({
    body: z.object({
      name: UserFields.name,
      email: UserFields.email,
      password: UserFields.password,
    }),
  }),
)
