'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/app/components'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
    staleTime: 60 * 1000,
    retry: 3,
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || 'unassigned'}
      onValueChange={(userId) => {
        // axios.patch('/api/issues/' + issue.id, {
        //   assignedToUserId: userId === 'unassigned' ? null : userId,
        // })
        fetch(`/api/issues/${issue.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            assignedToUserId: userId === 'unassigned' ? null : userId,
          }),
        })
      }}
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
  )
}

export default AssigneeSelect
