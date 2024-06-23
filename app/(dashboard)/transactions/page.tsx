'use client'
import TransactionTable from '@/app/(dashboard)/transactions/_components/TransactionTable'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { differenceInDays, startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })
  return (
    <section>
      <div className='flex flex-wrap items-center gap-5 p-6'>
        <h2 className='section-title'>Transactions history</h2>
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range

            if (!from || !to) return
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
              )
              return
            }

            setDateRange({ from, to })
          }}
        />
      </div>
      <div className=''>
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </section>
  )
}
