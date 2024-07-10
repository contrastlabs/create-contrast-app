import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execSync = promisify(exec)

async function run() {
  const [command, args] = process.argv.slice(2)

  if (!command) {
    throw new Error('Command is required.')
  }

  if (!['create', 'up', 'down'].includes(command)) {
    throw new Error('Invalid command.')
  }

  if (command === 'create' && !args) {
    throw new Error('Migration name is required.')
  }

  const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_SCHEMA,
  } = process.env

  const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

  await execSync(
    [
      `DATABASE_URL=${DATABASE_URL}`,
      'npx node-pg-migrate',
      command,
      args,
      '--migrations-dir ./src/infrastructure/database/migrations',
      '--migrations-table migrations',
      `--schema ${DATABASE_SCHEMA}`,
      '--create-schema',
      '--migration-file-language sql',
      '--decamelize true',
      '--lock false',
      '--verbose false',
    ].join(' '),
  ).then(({ stdout, stderr }) => {
    if (stderr) {
      console.error(stderr)

      process.exit(1)
    }

    console.log(stdout)
  })
}

run()
