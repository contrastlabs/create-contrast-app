import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  image: string
  role: string
  ip: string
}

interface Summary {
  total: number
  users: number
  moderators: number
  admins: number
}

async function getUsers() {
  return api
    .get<{ users: User[] }>('/users', {
      params: {
        select: [
          'id',
          'firstName',
          'lastName',
          'username',
          'image',
          'role',
          'ip',
        ].join(','),
      },
    })
    .then((response) => response.data.users)
}

async function getTotalUsers(role?: string) {
  const params = new URLSearchParams({
    select: 'id',
  })

  if (role) {
    params.append('key', 'role')
    params.append('value', role)
  }

  return api
    .get<{ total: number }>(role ? '/users/filter' : '/users', { params })
    .then((response) => response.data.total)
}

async function getSummary(): Promise<Summary> {
  const [total, users, moderators, admins] = await Promise.all([
    getTotalUsers(),
    getTotalUsers('user'),
    getTotalUsers('moderator'),
    getTotalUsers('admin'),
  ])

  return {
    total,
    users,
    moderators,
    admins,
  }
}

export type { User, Summary }
export { getUsers, getSummary }
