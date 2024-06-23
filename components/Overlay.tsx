'use client'
import { FC } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

interface OverlayProps {}

const Overlay: FC = () => {
  const pathname = usePathname()

  let title: string = 'Dashboard'

  if (pathname === '/manage') {
    title = 'Manage'
  } else if (pathname === '/transactions') {
    title = 'Transactions'
  } else {
    title = 'Dashboard'
  }

  return (
    <>
      <div className='flex flex-col min-h-[60vh] p-5 rounded-bl-3xl rounded-br-3xl bg-purple-500 dark:bg-purple-600'>
        <Header />
        <div className='mt-auto'>
          <h1 className='overlay-title'>{title}</h1>
        </div>
      </div>
    </>
  )
}

export { Overlay }
