import os from 'node:os'
import { Router } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { swaggerConfig } from '@/config'
import { userRoutes } from '@/modules/users/infrastructure/routes'

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
  return response.json({
    hostname: os.hostname(),
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

routes.use('/users', userRoutes)

export { routes }
