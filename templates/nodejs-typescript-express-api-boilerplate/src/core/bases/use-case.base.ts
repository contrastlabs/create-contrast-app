export abstract class UseCase<I, O = void> {
  abstract execute(input: I): Promise<O>
}
