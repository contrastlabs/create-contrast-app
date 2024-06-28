import 'express-async-errors'

import { RouteNotFoundError } from '@/core/errors'
import { Logger } from '@/core/utils'
import cors from 'cors'
import express from 'express'
import {
  HttpErrorMiddleware,
  HttpLoggerMiddleware,
  RequestManagerMiddleware,
} from './middlewares'
import { routes } from './routes'

const app = express()
const logger = Logger.from('Server')

app.disable('x-powered-by')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.use(cors())

app.use(HttpLoggerMiddleware.make())

app.use(RequestManagerMiddleware.make())

app.use(routes)

app.all('*', () => {
  throw new RouteNotFoundError()
})

app.use(HttpErrorMiddleware.make())

export { app, logger }
