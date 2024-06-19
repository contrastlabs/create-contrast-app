export interface MiddlewareBaseInstance<Options = any> {
  new (options: Options): MiddlewareBase<Options>
}

export interface MiddlewareConfig<I extends MiddlewareBaseInstance> {
  make(options?: any): InstanceType<I>['handle']
}

export abstract class MiddlewareBase<Options = false> {
  options: Options = {} as Options

  abstract handle(...args: any[]): any

  constructor(options: Options) {
    this.options = options
  }
}

export function buildMiddleware<I extends MiddlewareBaseInstance>(
  Middleware: I,
): MiddlewareConfig<I> {
  function make(options?: any) {
    const middleware = new Middleware(options)

    return middleware.handle.bind(middleware)
  }

  return {
    make,
  }
}