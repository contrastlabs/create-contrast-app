import { GraphQLScalarType } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    if (typeof value !== 'string') {
      throw new Error('Date cannot represent an invalid date string')
    }

    return new Date(value)
  },
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString()
    }

    return value
  },
})
