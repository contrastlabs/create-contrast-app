import { ApolloServer } from '@apollo/server'
import { expressMiddleware as expressApolloServerMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cors from 'cors'
import express from 'express'

import { makeSchemaWithDirectives } from '@/core/utils'
import { directives } from './directives'
import { resolvers } from './resolvers'
import { scalars } from './scalars'
import { typeDefs } from './typeDefs'

export async function createGraphQLServer() {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())
  app.use(cors())

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
      ...scalars,
      ...resolvers,
    },
  })

  const schemaWithDirectives = makeSchemaWithDirectives(schema, directives)

  const server = new ApolloServer({
    schema: schemaWithDirectives,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })

  await server.start()

  app.use(
    '/graphql',
    expressApolloServerMiddleware(server, {
      context: async (ctx) => ({
        authorization: ctx.req.headers.authorization,
      }),
    }),
  )

  return app
}
