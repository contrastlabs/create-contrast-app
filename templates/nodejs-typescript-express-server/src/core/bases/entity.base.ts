import { v4 as uuid } from 'uuid'

import { type EmptyObject, isUndefined } from '../utils'

export type EntityId = string | number

export interface EntityProps {
  createdAt?: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class EntityBase<
  Props extends EntityProps = EmptyObject,
  Id extends EntityId = string,
> {
  protected readonly _id: Id

  readonly props: Props

  constructor(props: Props, id?: Id) {
    this._id = (isUndefined(id) ? uuid() : id) as Id

    this.props = props
  }

  get id(): Id {
    return this._id
  }

  get createdAt(): Date {
    return this.props.createdAt as Date
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }

  get deletedAt(): Date | undefined | null {
    return this.props.deletedAt
  }

  created(): void {
    this.props.createdAt = new Date()
  }

  updated(): void {
    this.props.updatedAt = new Date()
  }

  deleted(): void {
    this.props.deletedAt = new Date()
  }
}
