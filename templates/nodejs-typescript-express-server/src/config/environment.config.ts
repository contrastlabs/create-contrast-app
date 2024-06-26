import 'dotenv/config'

import { z } from 'zod'

import { Logger } from '@/core/utils'

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  HTTP_SERVER_PORT: z.coerce.number().int().positive(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().int().positive(),
  DATABASE_NAME: z.string(),
  DATABASE_SCHEMA: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
})

type Environment = z.infer<typeof environmentSchema>

const environmentParse = environmentSchema.safeParse(process.env)

if (!environmentParse.success) {
  const logger = Logger.from('Environment')

  logger.error('There is an error with the server environment variables')
  logger.error(environmentParse.error.issues)

  process.exit(1)
}

const environment = {
  ...environmentParse.data,
  isProduction: environmentParse.data.NODE_ENV === 'production',
  isProd: environmentParse.data.NODE_ENV === 'production',
  isDevelopment: environmentParse.data.NODE_ENV === 'development',
  isDev: environmentParse.data.NODE_ENV === 'development',
  isTest: environmentParse.data.NODE_ENV === 'test',
}

export { environment, type Environment }
