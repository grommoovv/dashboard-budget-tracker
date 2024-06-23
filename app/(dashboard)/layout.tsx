import { Overlay } from '@/components/Overlay'
import React, { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-screen w-full flex-col'>
      <Overlay />
      <div className='w-full'>{children}</div>
    </div>
  )
}
