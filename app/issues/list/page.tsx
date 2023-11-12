import { IssueStatusBadge, Link } from '@/app/components'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import Pagination from '@/app/components/Pagination'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const where = { status }
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sort }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
}

export default IssuesPage
