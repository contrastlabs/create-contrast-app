import { useDetectClickOutside } from 'react-detect-click-outside'

import { useModal } from '@/hooks'
import { cn } from '@/lib/utils'

export function Content({
  className,
  children,
}: { className?: string; children: React.ReactNode }): JSX.Element {
  const model = useModal()

  const ref = useDetectClickOutside({ onTriggered: model.closeModal })

  return (
    <section
      ref={ref}
      className={cn(
        'p-4 max-w-md min-h-40 max-h-80 h-full w-full relative flex flex-col rounded-lg bg-white',
        className,
      )}
    >
      {children}
    </section>
  )
}
