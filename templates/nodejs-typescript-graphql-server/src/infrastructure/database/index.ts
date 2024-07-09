export interface User {
  id: number
  name: string
  age: number
  createdAt: Date
}

export const users = [
  {
    id: 1,
    name: 'Jhon Doe',
    age: 18,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 18,
    createdAt: new Date(),
  },
]
