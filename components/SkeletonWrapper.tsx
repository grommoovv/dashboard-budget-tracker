import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'

interface SkeletonWrapperProps {
  children: ReactNode
  isLoading: boolean
  fullWidth?: boolean
}

export const SkeletonWrapper: FC<SkeletonWrapperProps> = ({
  children,
  isLoading,
  fullWidth = true,
}) => {
  if (!isLoading) return children
  return (
    <Skeleton className={cn(fullWidth && 'w-full')}>
      <div className='opacity-0'>{children}</div>
    </Skeleton>
  )
}
