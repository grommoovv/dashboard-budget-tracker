'use client'
import { TransactionHistoryTable } from '@/app/(dashboard)/transactions/_components/TransactionHistoryTable'
import { startOfMonth } from 'date-fns'
import { useState } from 'react'
import { PickDateRange } from '../_features/PickDateRange'

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  return (
    <section>
      <div className='flex flex-wrap items-center gap-5 p-6'>
        <h2 className='section-title'>Transaction history</h2>
        <PickDateRange dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <div className=''>
        <TransactionHistoryTable from={dateRange.from} to={dateRange.to} />
      </div>
    </section>
  )
}
