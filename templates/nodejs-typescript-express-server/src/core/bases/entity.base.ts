export class EntityBase<Props, Id> {
  protected readonly _id: Id

  readonly props: Props

  constructor(props: Props, id?: Id) {
    this._id = id as Id
    this.props = props
  }
}
