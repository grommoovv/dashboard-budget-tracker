'use client'
import { DeleteTransaction } from '@/app/(dashboard)/transactions/_actions/deleteTransaction'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteTransaction } from '@/services'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  transactionId: string
}

export default function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
  const deleteMutation = useDeleteTransaction()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your transaction
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading('Deleting transaction...', {
                id: transactionId,
              })
              deleteMutation.mutateAsync(transactionId)
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
