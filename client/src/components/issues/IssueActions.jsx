import { Link } from 'react-router-dom';
import { Box, Button, Flex } from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';
import StatusSelect from './StatusSelect';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';

const IssueActions = ({ issue }) => {
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
