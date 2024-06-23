import { FC, ReactNode, useCallback } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CountUp from 'react-countup'

interface StatisticsCardProps {
  formatter: Intl.NumberFormat
  icon: ReactNode
  title: String
  value: number
}

export const StatisticsCard: FC<StatisticsCardProps> = ({ formatter, value, title, icon }) => {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value)
    },
    [formatter]
  )

  return (
    <Card className='h-max w-full items-center gap-2 bg-transparent'>
      <CardHeader className='flex-row justify-between items-center'>
        <h4 className='stat-card-title'>{title}</h4>
        <div>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-start gap-0'>
          <CountUp
            preserveValue
            redraw={false}
            end={value}
            decimals={2}
            formattingFn={formatFn}
            className='text-4xl'
          />
        </div>
      </CardContent>
    </Card>
  )
}
