'use client'

import { GetBalanceStatsResponseType } from '@/app/api/stats/balance/route'
import { SkeletonWrapper } from '@/components/SkeletonWrapper'
import { StatisticsCard } from '@/components/cards/StaticticsCard'

import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import React, { FC, ReactNode, useCallback, useMemo } from 'react'
import { CreateTransactionDialog } from './CreateTransactionDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface StatsCardsProps {
  from: Date
  to: Date
  userSettings: UserSettings
}

export const StatsCards: FC<StatsCardsProps> = ({ from, to, userSettings }) => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ['overview', 'stats', from, to],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) =>
        res.json()
      ),
  })

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
  }, [userSettings.currency])

  const income = statsQuery.data?.income || 0
  const expense = statsQuery.data?.expense || 0

  const balance = income - expense

  return (
    <div className='relative grid grid-cols-5 w-full gap-2'>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatisticsCard
          formatter={formatter}
          value={income}
          title='Income'
          icon={
            <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatisticsCard
          formatter={formatter}
          value={expense}
          title='Expense'
          icon={
            <TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10' />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatisticsCard
          formatter={formatter}
          value={balance}
          title='Balance'
          icon={
            <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CreateIncomeTransaction />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CreateExprenseTransaction />
      </SkeletonWrapper>
    </div>
  )
}

const CreateIncomeTransaction = () => {
  return (
    <CreateTransactionDialog
      trigger={
        <Card className='flex flex-col justify-between h-full w-full gap-2 border-emerald-500 bg-emerald-800/50 text-white hover:bg-emerald-700 hover:text-white transition-all'>
          <CardHeader className='flex-row justify-between items-center'>
            <h4 className='stat-card-title'>New Income</h4>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-emerald-800'>
              <Plus />
            </div>
          </CardHeader>
          <CardContent className='flex justify-end items-end w-full'>
            <div className='text-4xl'>Add</div>
          </CardContent>
        </Card>
      }
      type='income'
    />
  )
}

const CreateExprenseTransaction = () => {
  return (
    <CreateTransactionDialog
      trigger={
        <Card className='flex flex-col justify-between h-full w-full gap-2 border-rose-500 bg-rose-800/50 text-white hover:bg-rose-700 hover:text-white transition-all'>
          <CardHeader className='flex-row justify-between items-center'>
            <h4 className='stat-card-title'>New Expense</h4>
            <div className='flex justify-center items-center w-12 h-12 rounded-full bg-rose-800'>
              <Plus />
            </div>
          </CardHeader>
          <CardContent className='flex justify-end items-end w-full'>
            <div className='text-4xl'>Add</div>
          </CardContent>
        </Card>
      }
      type='expense'
    />
  )
}
