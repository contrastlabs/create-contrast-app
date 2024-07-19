'use client'

import { createContext, useCallback, useState } from 'react'

export interface ModalContextData {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const closeModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
