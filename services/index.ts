import { CreateTransaction } from '@/app/(dashboard)/_actions/transactions'
import { DeleteTransaction } from '@/app/(dashboard)/transactions/_actions/deleteTransaction'
import { GetBalanceStatsResponseType } from '@/app/api/stats/balance/route'
import { DateToUTCDate } from '@/lib/helpers'
import { UserSettings } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetUserSettings = () => {
  return useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  })
}

export const useGetStatistics = (from: Date, to: Date) => {
  return useQuery<GetBalanceStatsResponseType>({
    queryKey: ['overview', 'stats', from, to],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) =>
        res.json()
      ),
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success('Transaction created successfully 🎉', {
        id: 'create-transaction',
      })

      queryClient.invalidateQueries({
        queryKey: ['overview'],
      })
    },
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async (data, variables) => {
      toast.success('Transaction deleted successfully', {
        id: variables, // предполагается, что variables — это transactionId
      })
      await queryClient.invalidateQueries({
        queryKey: ['transactions'],
      })
    },
    onError: (error, variables) => {
      toast.error('Something went wrong', {
        id: variables, // предполагается, что variables — это transactionId
      })
    },
  })
}
