import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { ModalProvider, ReactQueryProvider } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Template',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'text-white scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700 bg-gray-900',
          inter.className,
        )}
      >
        <ReactQueryProvider>
          <ModalProvider>
            <div className="w-full flex flex-col">{children}</div>
          </ModalProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
