import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CreateTransactionDialog } from './CreateTransactionDialog'
import { Plus } from 'lucide-react'
import { FC } from 'react'
import { cn } from '@/lib/utils'

interface CreateIncomeExpenseTransactionProps {
  type: 'income' | 'expense'
}

export const CreateIncomeExpenseTransaction: FC<CreateIncomeExpenseTransactionProps> = (props) => {
  const { type } = props

  let title

  if (type === 'income') {
    title = 'New Income'
  } else if (type === 'expense') {
    title = 'New Expense'
  }

  let colorStyle

  if (type === 'income') {
    colorStyle = 'border-dashed border-emerald-500 bg-emerald-800/50 hover:bg-emerald-700'
  } else if (type === 'expense') {
    colorStyle = 'border-dashed border-rose-500 bg-rose-800/50 hover:bg-rose-700'
  }

  return (
    <CreateTransactionDialog
      trigger={
        <Card
          className={cn(
            'flex flex-col justify-between h-full w-full gap-2 transition-all',
            colorStyle
          )}
        >
          <CardHeader className='flex-row justify-between items-center'>
            <h4 className='stat-card-title'>{title}</h4>
            <div
              className={cn(
                'flex justify-center items-center w-12 h-12 rounded-full',
                type === 'income' ? 'bg-emerald-800' : 'bg-rose-800'
              )}
            >
              <Plus />
            </div>
          </CardHeader>
          <CardContent className='flex justify-end items-end w-full'>
            <div className='text-4xl'>Add</div>
          </CardContent>
        </Card>
      }
      type={type}
    />
  )
}
