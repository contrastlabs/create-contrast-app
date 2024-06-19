import os from 'node:os'
import { Router } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { swaggerConfig } from '@/config'
import { uptime } from './server'

const routes = Router()

/**
 * @swagger
 * /helthz:
 *   get:
 *     summary: Health Check API
 *     tags: [miscellaneous]
 *     security: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 */
routes.get('/helthz', (_request, response) => {
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()
  const usedMemory = totalMemory - freeMemory

  return response.json({
    hostname: os.hostname(),
    httpServerUptime: uptime,
    osUptime: os.uptime(),
    cpus: os.cpus().length,
    memory: {
      total: totalMemory,
      free: freeMemory,
      used: usedMemory,
    },
  })
})

const openApiJson = swaggerJsDoc(swaggerConfig)

/**
 * @swagger
 * /swagger:
 *   get:
 *     summary: Swagger Docs
 *     tags: [miscellaneous]
 *     security: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 */
routes.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerConfig)),
)

/**
 * @swagger
 * /openapi.json:
 *   get:
 *     summary: OpenAPI JSON
 *     tags: [miscellaneous]
 *     security: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 */
routes.get('/openapi.json', (_request, response) => response.json(openApiJson))

export { routes }
