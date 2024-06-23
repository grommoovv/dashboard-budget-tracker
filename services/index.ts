import { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const useGetUserSettings = () => {
  return useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  })
}
