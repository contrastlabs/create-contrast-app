import { userResolvers } from './users.resolver'

export const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
}
