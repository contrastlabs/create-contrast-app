import 'express-async-errors'

import cors from 'cors'
import express from 'express'

import { environment } from '@/config'
import { RouteNotFoundError } from '@/core/errors'
import { Logger } from '@/core/utils'
import { HttpErrorMiddleware, HttpLoggerMiddleware } from './middlewares'
import { routes } from './routes'

const app = express()
const logger = Logger.from('Server')

app.disable('x-powered-by')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.use(cors())

app.use(HttpLoggerMiddleware.make())

app.use(routes)

app.all('*', () => {
  throw new RouteNotFoundError()
})

app.use(HttpErrorMiddleware.make())

let uptime = 0

function startHttpServer() {
  app.listen(environment.HTTP_SERVER_PORT, '0.0.0.0', () => {
    logger.success(`Server running on port ${environment.HTTP_SERVER_PORT}`)
    logger.info(
      `See the API documentation at http://localhost:${environment.HTTP_SERVER_PORT}/swagger`,
    )
  })

  setInterval(() => {
    uptime += 1
  }, 1000)
}

export { logger, uptime, startHttpServer }
