import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'

interface SchemaDirective {
  name: string
  handle: (context: Record<string, any>) => any
}

export function makeSchemaWithDirectives(
  schema: GraphQLSchema,
  directives: SchemaDirective[],
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig: any) => {
      for (const directive of directives) {
        const hasDirective = getDirective(schema, fieldConfig, directive.name)

        if (hasDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig

          fieldConfig.resolve = async (
            source: any,
            args: any,
            context: any,
            info: any,
          ) => {
            await directive.handle(context)

            const result = await resolve(source, args, context, info)

            return result
          }

          return fieldConfig
        }
      }
    },
  })
}
