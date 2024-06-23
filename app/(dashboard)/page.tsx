import { CreateTransactionDialog } from '@/app/(dashboard)/_components/CreateTransactionDialog'
import { History } from '@/app/(dashboard)/_components/History'
import { Overview } from '@/app/(dashboard)/_components/Overview'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!userSettings) {
    redirect('/wizard')
  }

  return (
    <div className='h-full bg-background'>
      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  )
}
