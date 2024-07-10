import pgp from 'pg-promise'

import { databaseConfig } from '@/config'

const connection = pgp({
  schema: databaseConfig.schema,
})

export const database = connection({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
  user: databaseConfig.user,
  password: databaseConfig.password,
  max: databaseConfig.maxPoolSize,
})
