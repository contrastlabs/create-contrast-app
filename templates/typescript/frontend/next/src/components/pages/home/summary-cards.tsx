'use client'

import { type Summary, getSummary } from '@/lib/services'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

export function SummaryCards({
  initialSummary,
}: { initialSummary: Summary }): JSX.Element {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary(),
    initialData: initialSummary,
  })

  return (
    <section
      className={cn(
        'grid grid-cols-3 gap-4',
        "mixin/card:multi-['p-4;flex;flex-col;rounded-md;bg-gray-700']",
        "mixin/card-title:multi-['text-sm;text-zinc-400']",
        "mixin/card-count:multi-['text-lg;font-bold;text-gray-100']",
      )}
    >
      <div className="mixin/card">
        <span className="mixin/card-title">Users</span>
        <span className="mixin/card-count">{data.users}</span>
      </div>

      <div className="mixin/card">
        <span className="mixin/card-title">Moderators</span>
        <span className="mixin/card-count">{data.moderators}</span>
      </div>

      <div className="mixin/card">
        <span className="mixin/card-title">Admins</span>
        <span className="mixin/card-count">{data.admins}</span>
      </div>
    </section>
  )
}
