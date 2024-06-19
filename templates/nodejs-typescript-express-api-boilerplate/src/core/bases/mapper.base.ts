import type { EntityBase } from './entity.base'

export abstract class Mapper {
  abstract toJSON(entity: EntityBase): any
  abstract toDatabaseCreate(...args: any[]): any
  abstract toDatabaseUpdate(...args: any[]): any
  abstract toDomain<E = EntityBase>(raw: any): E
}
