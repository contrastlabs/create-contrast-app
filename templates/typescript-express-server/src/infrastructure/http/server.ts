import { environment } from '@/config'
import { app, logger } from './app'

function startHttpServer() {
  app.listen(environment.HTTP_SERVER_PORT, '0.0.0.0', () => {
    logger.success(
      `Server running on port ${environment.HTTP_SERVER_PORT} at http://localhost:${environment.HTTP_SERVER_PORT}`,
    )

    logger.info(
      `See the API documentation at http://localhost:${environment.HTTP_SERVER_PORT}/swagger`,
    )
  })
}

export { logger, startHttpServer }
