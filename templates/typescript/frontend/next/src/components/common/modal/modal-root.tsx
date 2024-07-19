import { useDisableBodyScroll, useModal } from '@/hooks'
import { cn } from '@/lib/utils'

export function Root({ children }: { children: React.ReactNode }): JSX.Element {
  const modal = useModal()

  useDisableBodyScroll(modal.isOpen)

  return (
    <>
      {modal.isOpen && (
        <div
          className={cn(
            'h-screen w-screen',
            'fixed inset-0 z-50',
            'flex items-center justify-center',
            'overflow-hidden',
            'bg-black bg-opacity-50',
          )}
        >
          {children}
        </div>
      )}
    </>
  )
}
