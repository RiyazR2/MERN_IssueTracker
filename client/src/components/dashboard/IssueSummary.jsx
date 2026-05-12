import { Card, Flex, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const IssueSummary = ({ stats }) => {
  const statuses = [
    { label: 'Open Issues', value: stats.open, status: 'OPEN', color: 'text-red-600' },
    { label: 'In Progress', value: stats.inProgress, status: 'IN_PROGRESS', color: 'text-violet-600' },
    { label: 'Closed Issues', value: stats.closed, status: 'CLOSED', color: 'text-green-600' },
  ];

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Text size="3" weight="bold">
          Issue Summary
        </Text>
        <Flex direction="column" gap="2">
          {statuses.map((stat) => (
            <Link
              key={stat.status}
              to={`/issues?status=${stat.status}`}
              className="hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <Flex justify="between" align="center">
                <Text size="2">{stat.label}</Text>
                <Text size="4" weight="bold" className={stat.color}>
                  {stat.value}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default IssueSummary;
