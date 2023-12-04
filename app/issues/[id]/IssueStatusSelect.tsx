'use client'

import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import toast, { Toaster } from 'react-hot-toast'

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ]

  const changeIssueStatus = (status: Status) => {
    fetch(`/api/issues/${issue.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: status,
      }),
    }).then((res) => {
      if (!res.ok) toast.error('Changes could not be saved.')
    })
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.status || 'Open'}
        onValueChange={changeIssueStatus}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default IssueStatusSelect
