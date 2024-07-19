import { X } from 'lucide-react'

import { useModal } from '@/hooks'
import { cn } from '@/lib/utils'

export function Close({ className }: { className?: string }): JSX.Element {
  const modal = useModal()

  return (
    <button
      type="button"
      className="w-10 h-10 absolute top-4 right-4 p-2 flex items-center justify-center border border-gray-500 rounded-full"
      onClick={modal.closeModal}
    >
      <X size={24} className={cn('cursor-pointer text-gray-500', className)} />
    </button>
  )
}
