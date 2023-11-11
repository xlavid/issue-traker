'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'

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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={(userId) => {
          // axios
          //   .patch(`/apii/issues/${issue.id}`, {
          //     assignedToUserId: userId === 'unassigned' ? null : userId,
          //   })
          //   .catch(() => toast.error('Changes could not be saved.'))
          fetch(`/apii/issues/${issue.id}`, {
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
      <Toaster />
    </>
  )
}

export default AssigneeSelect
