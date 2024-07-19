'use client'

import { Download, Plus } from 'lucide-react'

import { Modal } from '@/components/common'
import { Button } from '@/components/ui'
import { useModal } from '@/hooks'

export function Hero(): JSX.Element {
  const modal = useModal()

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-zinc-100">Users</h1>

          <p className="text-zinc-400">Users list fetched from the API</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondaryOutline" icon={<Download size={18} />}>
            Export CSV
          </Button>

          <Button icon={<Plus size={18} />} onClick={modal.openModal}>
            Add user
          </Button>
        </div>
      </section>

      <Modal.Root>
        <Modal.Content>
          <Modal.Close />
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
