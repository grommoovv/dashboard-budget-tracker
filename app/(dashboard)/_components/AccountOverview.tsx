'use client'
import { FC, useMemo } from 'react'
import { SkeletonWrapper } from '@/components/SkeletonWrapper'
import { AccountOverviewCard } from '@/components/cards/AccountOverviewCard'
import { GetFormatterForCurrency } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { CreateIncomeExpenseTransaction } from '../_features/CreateIncomeExpenseTransaction'
import { useGetStatistics } from '@/services'
import { TransactionType } from '@/lib/types'

interface AccountOverviewProps {
  from: Date
  to: Date
  userSettings: UserSettings
}

export const AccountOverview: FC<AccountOverviewProps> = ({ from, to, userSettings }) => {
  const statistics = useGetStatistics(from, to)

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
  }, [userSettings.currency])

  const statsDate = [
    {
      value: statistics.data?.income || 0,
      title: 'Income',
      icon: (
        <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
      ),
    },
    {
      value: statistics.data?.expense || 0,
      title: 'Expense',
      icon: (
        <TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10' />
      ),
    },
    {
      value: (statistics.data?.income || 0) - (statistics.data?.expense || 0),
      title: 'Balance',
      icon: (
        <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
      ),
    },
  ]

  const transactionTypes: TransactionType[] = ['income', 'expense']

  return (
    <>
      <div className='relative grid grid-cols-4 w-full gap-2'>
        {statsDate.map((card, index) => (
          <SkeletonWrapper key={index} isLoading={statistics.isFetching}>
            <AccountOverviewCard
              formatter={formatter}
              value={card.value}
              title={card.title}
              icon={card.icon}
            />
          </SkeletonWrapper>
        ))}
      </div>
      <div className='relative grid grid-cols-4 w-full gap-2'>
        <div></div>
        <div></div>
        {transactionTypes.map((type) => (
          <SkeletonWrapper key={type} isLoading={statistics.isFetching}>
            <CreateIncomeExpenseTransaction type={type} />
          </SkeletonWrapper>
        ))}
      </div>
    </>
  )
}
