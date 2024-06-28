import { environment } from './environment.config'

export const databaseConfig = {
  host: environment.DATABASE_HOST,
  port: environment.DATABASE_PORT,
  database: environment.DATABASE_NAME,
  schema: environment.DATABASE_SCHEMA,
  user: environment.DATABASE_USER,
  password: environment.DATABASE_PASSWORD,
  maxPoolSize: 20,
}
