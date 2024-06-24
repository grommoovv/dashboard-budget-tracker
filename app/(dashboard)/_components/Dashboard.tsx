'use client'
import { CategoryOverview } from '@/app/(dashboard)/_components/CategoryOverview'
import { AccountOverview } from '@/app/(dashboard)/_components/AccountOverview'
import { UserSettings } from '@prisma/client'
import { startOfMonth } from 'date-fns'
import { FC, useState } from 'react'
import { PickDateRange } from '../_features/PickDateRange'
import { HistoryOverviewGraph } from './HistoryOverviewGraph'

interface DashboardProps {
  userSettings: UserSettings
}

export const Dashboard: FC<DashboardProps> = ({ userSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  return (
    <>
      <section>
        <div className='flex flex-wrap items-center gap-5 p-6'>
          <h2 className='section-title'>Account overview</h2>
          <div className='flex items-center gap-3'>
            <PickDateRange dateRange={dateRange} setDateRange={setDateRange} />
          </div>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <AccountOverview userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
          <CategoryOverview userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
          <HistoryOverviewGraph userSettings={userSettings} />
        </div>
      </section>
    </>
  )
}
