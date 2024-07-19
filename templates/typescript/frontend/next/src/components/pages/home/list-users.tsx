'use client'

import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'

import { Input } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { type Summary, type User, getUsers } from '@/lib/services'

export function ListUsers({
  initialUsers,
}: { initialUsers: User[] }): JSX.Element {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    initialData: initialUsers,
  })

  const { data: summary } = useQuery<Summary>({
    queryKey: ['summary'],
  })

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-100">
          All users ({summary?.total})
        </h2>

        <div className="flex items-center gap-4">
          <Input
            variant="outline"
            icon={<Search size={18} />}
            placeholder="Search"
          />

          <Button
            variant="secondaryOutline"
            icon={<SlidersHorizontal size={18} />}
          >
            Filters
          </Button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-800">
          <tr className="mixin/label:multi-['px-4;py-2;text-xs;uppercase;text-gray-400']">
            <th className="mixin/label">Name</th>
            <th className="mixin/label">Role</th>
            <th className="mixin/label">IP</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="mixin/item:multi-['px-4;py-2;text-gray-400;border-b;border-gray-900;'] hover:multi-['cursor-pointer;bg-gray-700']"
            >
              <td className="mixin/item flex items-center gap-4">
                <Image
                  src={user.image}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />

                <div className="flex flex-col">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>

                  <span className="text-xs text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </td>

              <td className="mixin/item">{user.role}</td>

              <td className="mixin/item">{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
