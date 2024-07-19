import { useEffect } from 'react'

export function useDisableBodyScroll(isOpen: boolean) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])
}
