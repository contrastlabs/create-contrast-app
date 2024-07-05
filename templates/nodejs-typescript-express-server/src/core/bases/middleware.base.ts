export abstract class MiddlewareBase<Options = false> {
  options: Options = {} as Options

  abstract handle(...args: any[]): any

  constructor(options: Options) {
    this.options = options
  }
}
