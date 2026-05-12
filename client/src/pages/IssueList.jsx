import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Container, Flex, Heading, Select } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import issueService from '../services/issueService';
import IssueTable from '../components/issues/IssueTable';
import Skeleton from '../components/common/Skeleton';
import { STATUS_OPTIONS } from '../utils/constants';

const IssueList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['issues', statusFilter],
    queryFn: () =>
      issueService.getIssues(statusFilter ? { status: statusFilter } : {}),
  });

  const handleStatusChange = (value) => {
    if (value) {
      setSearchParams({ status: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container>
      <Flex justify="between" align="center" className="mb-6">
        <Heading size="6">Issues</Heading>
        <Link to="/issues/new">
          <Button>
            <PlusIcon /> New Issue
          </Button>
        </Link>
      </Flex>

      <div className="mb-4">
        <Select.Root value={statusFilter} onValueChange={handleStatusChange}>
          <Select.Trigger placeholder="Filter by status" />
          <Select.Content>
            <Select.Item value="">All Statuses</Select.Item>
            {STATUS_OPTIONS.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {isLoading ? (
        <Skeleton count={10} height={60} className="mb-2" />
      ) : (
        <IssueTable issues={data?.data || []} />
      )}
    </Container>
  );
};

export default IssueList;
