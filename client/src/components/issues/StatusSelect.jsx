import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Select } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import issueService from '../../services/issueService';

const StatusSelect = ({ issue }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ issueId, status }) => 
      issueService.updateIssue(issueId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['issue', issue._id]);
      queryClient.invalidateQueries(['issues']);
      toast.success('Status updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const handleStatusChange = (status) => {
    mutation.mutate({ issueId: issue._id, status });
  };

  const statusColors = {
    OPEN: 'red',
    IN_PROGRESS: 'orange',
    CLOSED: 'green',
  };

  const statusLabels = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed',
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Status
      </label>
      <Select.Root
        value={issue.status}
        onValueChange={handleStatusChange}
        disabled={mutation.isPending}
      >
        <Select.Trigger 
          className="w-full cursor-pointer"
          color={statusColors[issue.status]}
        />
        <Select.Content>
          <Select.Item value="OPEN" className="cursor-pointer">
            🔴 Open
          </Select.Item>
          <Select.Item value="IN_PROGRESS" className="cursor-pointer">
            🟡 In Progress
          </Select.Item>
          <Select.Item value="CLOSED" className="cursor-pointer">
            🟢 Closed
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default StatusSelect;
