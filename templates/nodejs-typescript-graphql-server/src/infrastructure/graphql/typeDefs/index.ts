import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'

const directoryPath = __dirname

const gqlFiles = readdirSync(directoryPath).filter(
  (file) => extname(file) === '.gql',
)

const handleReadFile = (file: string) =>
  readFileSync(join(directoryPath, file), {
    encoding: 'utf-8',
  })

export const typeDefs = `
 ${gqlFiles.map(handleReadFile).join('\n')}
`
