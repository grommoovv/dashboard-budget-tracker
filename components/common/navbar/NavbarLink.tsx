'use client'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DashboardIcon } from '@radix-ui/react-icons'
import { LayoutDashboardIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

interface NavbarLinkProps {
  link: string
  label: string
  icon: JSX.Element
  clickCallback?: () => void
}

export const NavbarLink: FC<NavbarLinkProps> = ({ link, label, icon, clickCallback }) => {
  const pathname = usePathname()
  const isActive = pathname === link

  return (
    <div className='relative flex items-center'>
      <Link
        href={link}
        className={cn(
          'flex gap-2 w-full justify-start items-center leading-none text-lg text-zinc-50 transition-all',
          isActive && 'text-zinc-900 font-semibold'
        )}
        onClick={() => {
          if (clickCallback) {
            clickCallback()
          }
        }}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </div>
  )
}
