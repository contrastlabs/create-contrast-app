export class ValueObjectBase<Props> {
  readonly props: Props

  constructor(props: Props) {
    this.props = props
  }
}
