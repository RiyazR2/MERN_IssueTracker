import { Link } from 'react-router-dom';
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import IssueStatusBadge from '../common/IssueStatusBadge';

const LatestIssues = ({ issues }) => {
  return (
    <Card>
      <Heading size="4" className="mb-4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Assigned To
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="3">
                <Text color="gray" align="center">
                  No issues yet. Create your first issue!
                </Text>
              </Table.Cell>
            </Table.Row>
          ) : (
            issues.map((issue) => (
              <Table.Row key={issue._id}>
                <Table.Cell>
                  <Flex direction="column" gap="1">
                    <Link to={`/issues/${issue._id}`} className="font-medium hover:underline">
                      {issue.title}
                    </Link>
                    <div className="md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Flex>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.assignedTo ? (
                    <Flex gap="2" align="center">
                      <Avatar
                        src={issue.assignedTo.image}
                        fallback={issue.assignedTo.name[0]}
                        size="1"
                        radius="full"
                      />
                      <Text size="2">{issue.assignedTo.name}</Text>
                    </Flex>
                  ) : (
                    <Text color="gray">Unassigned</Text>
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
