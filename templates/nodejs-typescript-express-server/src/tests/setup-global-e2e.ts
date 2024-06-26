import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { database } from '@/infrastructure/database'

const execSync = promisify(exec)

const databaseName = 'test'

async function createDatabase() {
  return await database.query(`CREATE DATABASE ${databaseName}`)
}

async function isDatabaseExists() {
  return await database
    .query('SELECT oid FROM pg_database WHERE datname = $1', [databaseName])
    .then(([databaseExists]) => !!databaseExists)
}

async function dropDatabase() {
  return await database.query(`DROP DATABASE IF EXISTS ${databaseName}`)
}

async function runMigrations() {
  return await execSync('npm run database:migrate:up')
}

export async function setup() {
  const databaseExists = await isDatabaseExists()

  if (databaseExists) {
    await dropDatabase()
  }

  await createDatabase()

  process.env.DATABASE_NAME = databaseName

  await runMigrations()
}

export async function teardown() {
  const databaseExists = await isDatabaseExists()

  if (databaseExists) {
    await dropDatabase()
  }

  process.exit(0)
}
