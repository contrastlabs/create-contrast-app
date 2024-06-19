export interface ControllerBaseInstance {
  new (): ControllerBase
}

export interface ControllerConfig<I extends ControllerBaseInstance> {
  make(): InstanceType<I>['handle']
}

export abstract class ControllerBase {
  abstract handle(...args: any[]): any
}

export function buildController<I extends ControllerBaseInstance>(
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
