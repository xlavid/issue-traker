'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { Skeleton } from '@/app/components'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignIssue = (userId: string) => {
    // axios
    //   .patch(`/api/issues/${issue.id}`, {
    //     assignedToUserId: userId === 'unassigned' ? null : userId,
    //   })
    //   .catch(() => toast.error('Changes could not be saved.'))

    fetch(`/api/issues/${issue.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        assignedToUserId: userId === 'unassigned' ? null : userId,
      }),
    }).then((res) => {
      if (!res.ok) toast.error('Changes could not be saved.')
    })
    // .catch(() => {
    //   toast.error('host not found, no connection, server not responding, etc...')
    // })
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
    staleTime: 60 * 1000,
    retry: 3,
  })

export default AssigneeSelect
