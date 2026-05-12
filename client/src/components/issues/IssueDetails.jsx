import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import IssueStatusBadge from '../common/IssueStatusBadge';

const IssueDetails = ({ issue }) => {
  return (
    <div>
      <Heading size="6" className="mb-3">
        {issue.title}
      </Heading>
      
      <Flex gap="3" className="mb-5">
        <IssueStatusBadge status={issue.status} />
        <Text size="2" color="gray">
          Created {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </Flex>

      <Card className="prose max-w-none">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
