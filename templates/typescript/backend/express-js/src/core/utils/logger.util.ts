import { Console } from 'node:console'
import { format, inspect } from 'node:util'

import { type Colorette, createColors } from 'colorette'

type Method = 'debug' | 'error' | 'info' | 'trace' | 'warn'

enum Level {
  Success = 0,
  Trace = 1,
  Debug = 2,
  Info = 3,
  Warn = 4,
  Error = 5,
  Fatal = 6,
}

interface LevelContext {
  name: string
  color: keyof Colorette
  method: Method
}

const Levels: Record<Level, Readonly<LevelContext>> = {
  [Level.Success]: { color: 'green', method: 'info', name: 'success' },
  [Level.Trace]: { color: 'blueBright', method: 'trace', name: 'trace' },
  [Level.Debug]: { color: 'magenta', method: 'debug', name: 'debug' },
  [Level.Info]: { color: 'blue', method: 'info', name: 'info' },
  [Level.Warn]: { color: 'yellow', method: 'warn', name: 'warn' },
  [Level.Error]: { color: 'red', method: 'error', name: 'error' },
  [Level.Fatal]: { color: 'redBright', method: 'error', name: 'fatal' },
}

const colors = createColors()

export class Logger {
  constructor(private readonly scope: string) {}

  getDateTime(): string {
    const date = new Date()

    return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  }

  getPid(): number {
    return process.pid
  }

  getHeader(scope: string): string {
    const header: string[] = [`[${this.getDateTime()}]`, `(${this.getPid()})`]

    if (typeof scope !== 'undefined') {
      header.push(`[${scope}]`)
    }

    return header.map((item) => colors.gray(item)).join(' ')
  }

  setWrite(
    scope: string,
    context: LevelContext,
    value: unknown,
    args: readonly unknown[],
  ): void {
    const console = new Console(process.stdout, process.stderr)

    const header = `${this.getHeader(scope)} ${colors[context.color](
      context.name.toLowerCase(),
    )}`

    const formatted =
      typeof value === 'string'
        ? format(value, ...args)
        : inspect(value, { colors: true })

    console[context.method](
      `${header} ${colors.white(formatted.replaceAll('\n', `\n${header}`))}`,
    )
  }

  static from(scope: string): Logger {
    return new Logger(scope)
  }

  trace(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Trace], value, args)
  }

  debug(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Debug], value, args)
  }

  info(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Info], value, args)
  }

  warn(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Warn], value, args)
  }

  error(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Error], value, args)
  }

  fatal(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Fatal], value, args)
  }

  success(value: unknown, ...args: readonly unknown[]): void {
    this.setWrite(this.scope, Levels[Level.Success], value, args)
  }
}
