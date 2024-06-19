export class ValueObjectBase<ValueObjectProps> {
  readonly props: ValueObjectProps

  constructor(props: ValueObjectProps) {
    this.props = props
  }
}
