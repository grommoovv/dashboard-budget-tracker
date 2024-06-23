import { NavbarLink } from './NavbarLink'

import { LayoutDashboardIcon, ArrowDownUp, SettingsIcon } from 'lucide-react'

const routes = [
  { label: 'Dashboard', link: '/', icon: <LayoutDashboardIcon size={16} /> },
  { label: 'Transactions', link: '/transactions', icon: <ArrowDownUp size={16} /> },
  { label: 'Manage', link: '/manage', icon: <SettingsIcon size={16} /> },
]

export const Navbar = () => {
  return (
    <>
      <nav className='flex gap-10 w-max h-max border-2 border-zinc-900 rounded-full py-2 px-6'>
        {routes.map((r) => (
          <NavbarLink key={r.label} link={r.link} label={r.label} icon={r.icon} />
        ))}
      </nav>
    </>
  )
}
