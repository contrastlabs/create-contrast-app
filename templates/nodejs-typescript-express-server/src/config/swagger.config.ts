import type swaggerJsDoc from 'swagger-jsdoc'

import { description, name as title, version } from 'package.json'
import { environment } from './environment.config'

export const swaggerConfig: swaggerJsDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title,
      version,
      description,
      contact: {
        email: 'izakdvlpr@gmail.com',
        name: 'izakdvlpr',
        url: 'https://izak.tech',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://{ip}:{port}',
        description: 'Development',
        variables: {
          ip: {
            default: 'localhost',
          },
          port: {
            default: String(environment.HTTP_SERVER_PORT),
          },
        },
      },
    ],
    security: [{ BearerAuth: [] }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Place a valid JWT token.',
        },
      },
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          required: false,
          type: 'number',
          schema: {
            type: 'integer',
            default: 1,
          },
        },
        itemsPerPage: {
          name: 'itemsPerPage',
          in: 'query',
          required: false,
          type: 'number',
          schema: {
            type: 'integer',
            format: 'int32',
            default: 10,
            minimum: 5,
            maximum: 50,
          },
        },
        sort: {
          name: 'sort',
          in: 'query',
          required: false,
          type: 'number',
          schema: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            default: 'DESC',
          },
        },
      },
      responses: {
        200: {
          description: 'Ok',
        },
        201: {
          description: 'Created',
        },
        204: {
          description: 'No Content',
        },
        400: {
          description: 'Bad Request',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not Found',
        },
        409: {
          description: 'Conflict',
        },
        422: {
          description: 'Unprocessable Content',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
    },
  },
  apis: environment.isProd
    ? [
        './dist/infrastructure/http/routes.js',
        './dist/modules/**/infrastructure/http/routes/*.routes.js',
      ]
    : [
        './src/infrastructure/http/routes.ts',
        './src/modules/**/infrastructure/http/routes/*.routes.ts',
      ],
}
