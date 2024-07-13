import type { MiddlewareBase } from '@/core/bases'

interface MiddlewareInstance<Options = any> {
  new (options: Options): MiddlewareBase<Options>
}

interface MiddlewareConfig<I extends MiddlewareInstance> {
  make(options?: any): InstanceType<I>['handle']
}

export function buildMiddleware<I extends MiddlewareInstance>(
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
