export interface UseCase<I, O = void> {
  execute(input: I): Promise<O>
}
