import type { GraphQLResolveInfo } from 'graphql'

import { users } from '@/infrastructure/database'
import type { ContextValue, RootValue } from '../types'

export const userResolvers = {
  Query: {
    users: (
      _parent: RootValue,
      _args: any,
      _context: ContextValue,
      _info: GraphQLResolveInfo,
    ) => {
      return users
    },
    getUserById: (
      _parent: RootValue,
      args: { id: number },
      _context: ContextValue,
      _info: GraphQLResolveInfo,
    ) => {
      return users.find((user) => user.id === args.id) ?? null
    },
  },
}
