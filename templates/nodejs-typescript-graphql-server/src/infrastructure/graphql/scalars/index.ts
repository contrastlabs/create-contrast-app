import { dateScalar } from './date.scalar'

interface Scalars {
  Date: typeof dateScalar
}

export const scalars: Scalars = {
  Date: dateScalar,
}
