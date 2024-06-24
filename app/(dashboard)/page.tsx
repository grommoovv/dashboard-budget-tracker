import { Dashboard } from '@/app/(dashboard)/_components/Dashboard'
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
      <Dashboard userSettings={userSettings} />
    </div>
  )
}
