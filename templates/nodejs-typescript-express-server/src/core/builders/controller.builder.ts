import type { ControllerBase } from '@/core/bases'

interface ControllerInstance {
  new (): ControllerBase
}

interface ControllerConfig<I extends ControllerInstance> {
  make(): InstanceType<I>['handle']
}

export function buildController<I extends ControllerInstance>(
  Controller: I,
): ControllerConfig<I> {
  function make() {
    const middleware = new Controller()

    return middleware.handle.bind(middleware)
  }

  return {
    make,
  }
}
