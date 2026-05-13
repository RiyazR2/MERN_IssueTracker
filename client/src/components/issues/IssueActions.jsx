import { Link } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useAuth } from '../../context/AuthContext';
import StatusSelect from './StatusSelect';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';

const IssueActions = ({ issue }) => {
  const { user } = useAuth();

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Flex direction="column" gap="3" align="center" className="p-4 bg-gray-50 rounded">
        <Text size="2" color="gray" align="center">
          Login to manage issues
        </Text>
        <Link to="/login" className="w-full">
          <Button className="w-full cursor-pointer">
            Login with Google
          </Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="3">
      <StatusSelect issue={issue} />

      <AssigneeSelect issue={issue} />

      <Link to={`/issues/edit/${issue._id}`} className="w-full">
        <Button className="w-full cursor-pointer">
          <Pencil1Icon /> Edit Issue
        </Button>
      </Link>

      <DeleteIssueButton issueId={issue._id} />
    </Flex>
  );
};

export default IssueActions;
