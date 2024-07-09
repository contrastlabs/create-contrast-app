import { environment } from '@/config'
import { Logger } from '@/core/utils'
import { createGraphQLServer } from './app'

export async function startGraphQLServer() {
  const server = await createGraphQLServer()

  server.listen(environment.GRAPHQL_SERVER_PORT, '0.0.0.0', () => {
    const logger = Logger.from('GraphQLServer')

    logger.success(
      `Server running on port ${environment.GRAPHQL_SERVER_PORT} at http://localhost:${environment.GRAPHQL_SERVER_PORT}`,
    )

    logger.info(
      `See the GraphQL Playground at http://localhost:${environment.GRAPHQL_SERVER_PORT}/graphql`,
    )
  })
}
