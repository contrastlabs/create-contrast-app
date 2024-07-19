import { ListUsers, SummaryCards } from '@/components/pages/home'
import { Hero } from '@/components/pages/home/hero'
import { getSummary, getUsers } from '@/lib/services'

export default async function Home() {
  const users = await getUsers()
  const summary = await getSummary()

  return (
    <main className="w-full max-w-[1240px] px-8 py-6 mx-auto">
      <div className="flex flex-col gap-4">
        <Hero />
        <SummaryCards initialSummary={summary} />
        <ListUsers initialUsers={users} />
      </div>
    </main>
  )
}
