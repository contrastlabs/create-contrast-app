'use client'

import { useContext } from 'react'

import { ModalContext, type ModalContextData } from '@/providers/modal-provider'

export function useModal(): ModalContextData {
  return useContext(ModalContext)
}
