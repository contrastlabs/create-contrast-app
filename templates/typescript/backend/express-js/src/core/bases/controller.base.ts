import type { Request, Response } from 'express'

export interface ControllerBase {
  handle(request: Request, response: Response): unknown
}
