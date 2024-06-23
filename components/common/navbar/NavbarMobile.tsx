'use client'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo, LogoMobile } from '@/components/Logo'
import { routes } from '@/lib/constants'
import { NavbarLink } from './NavbarLink'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-8'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sm:w-[540px]' side='left'>
            <Logo />
            <div className='flex flex-col gap-1 pt-4'>
              {routes.map((r) => (
                <NavbarLink
                  key={r.label}
                  link={r.link}
                  label={r.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
          <LogoMobile />
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <UserButton afterSignOutUrl='/sign-in' />
        </div>
      </nav>
    </div>
  )
}
