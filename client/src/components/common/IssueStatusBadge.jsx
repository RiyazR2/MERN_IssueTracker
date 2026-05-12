import { Badge } from '@radix-ui/themes';
import { STATUS_MAP } from '../../utils/constants';

const IssueStatusBadge = ({ status }) => {
  const { label, color } = STATUS_MAP[status] || STATUS_MAP.OPEN;

  return (
    <Badge color={color} variant="soft">
      {label}
    </Badge>
  );
};

export default IssueStatusBadge;
