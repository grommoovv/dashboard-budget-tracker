import { DateRangePicker } from '@/components/ui/date-range-picker'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { differenceInDays } from 'date-fns'
import { Dispatch, FC, SetStateAction } from 'react'
import { toast } from 'sonner'

interface PickDateRangeProps {
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

export const PickDateRange: FC<PickDateRangeProps> = (props) => {
  const { dateRange, setDateRange } = props
  return (
    <DateRangePicker
      align='start'
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
