export interface Mapper {
  toJSON(...args: any[]): any
  toDomain(...args: any[]): any
}
