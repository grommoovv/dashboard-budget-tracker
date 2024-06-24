'use client'
import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route'
import { SkeletonWrapper } from '@/components/SkeletonWrapper'
import { CategoryOverviewCard } from '@/components/cards/CategoryOverviewCard'
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { FC, useMemo } from 'react'

interface CategoryOverviewProps {
  userSettings: UserSettings
  from: Date
  to: Date
}

export const CategoryOverview: FC<CategoryOverviewProps> = ({ userSettings, from, to }) => {
  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ['overview', 'stats', 'categories', from, to],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(
        (res) => res.json()
      ),
  })

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
  }, [userSettings.currency])

  return (
    <div className='flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoryOverviewCard formatter={formatter} type='income' data={statsQuery.data || []} />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoryOverviewCard formatter={formatter} type='expense' data={statsQuery.data || []} />
      </SkeletonWrapper>
    </div>
  )
}
