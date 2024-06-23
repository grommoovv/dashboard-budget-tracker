'use client'

import { CategoriesStats } from '@/app/(dashboard)/_components/CategoriesStats'
import { StatsCards } from '@/app/(dashboard)/_components/StatsCards'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

interface OverviewProps {
  userSettings: UserSettings
}

export const Overview: FC<OverviewProps> = ({ userSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  return (
    <section>
      <div className='flex flex-wrap items-center gap-5 p-6'>
        <h2 className='section-title'>Statistics</h2>
        <div className='flex items-center gap-3'>
          <PickStatisticsDateRange dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
      <div className='flex w-full flex-col gap-2'>
        <StatsCards userSettings={userSettings} from={dateRange.from} to={dateRange.to} />

        <CategoriesStats userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
      </div>
    </section>
  )
}

interface PickStatisticsDateRangeProps {
  dateRange: {
    from: Date
    to: Date
  }
  setDateRange: Dispatch<
    SetStateAction<{
      from: Date
      to: Date
    }>
  >
}

const PickStatisticsDateRange: FC<PickStatisticsDateRangeProps> = ({ dateRange, setDateRange }) => {
  return (
    <DateRangePicker
      align='end'
      initialDateFrom={dateRange.from}
      initialDateTo={dateRange.to}
      showCompare={false}
      onUpdate={(values) => {
        const { from, to } = values.range

        if (!from || !to) {
          return
        }

        if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
          toast.error(
            `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
          )
          return
        }

        setDateRange({ from, to })
      }}
    />
  )
}
