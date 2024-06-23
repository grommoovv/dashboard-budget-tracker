import { FC, ReactNode } from 'react'
import { Navbar } from './common/navbar/Navbar'
import { Logo } from '@/components/Logo'
import { UserButton } from '@clerk/nextjs'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <>
      <header className='relative flex justify-between items-center h-12'>
        <Logo />
        <div className='absolute top-0 left-[50%] translate-x-[-50%]'>
          <Navbar />
        </div>
        <div className='flex gap-4'>
          <ThemeSwitcher />
          <UserButton />
        </div>
      </header>
    </>
  )
}

export { Header }
