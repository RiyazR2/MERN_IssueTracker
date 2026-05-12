import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Select } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import userService from '../../services/userService';
import issueService from '../../services/issueService';

const AssigneeSelect = ({ issue }) => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(issue.assignedTo?._id || '');

  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const mutation = useMutation({
    mutationFn: (userId) =>
      issueService.updateIssue(issue._id, {
        assignedTo: userId || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['issue', issue._id]);
      queryClient.invalidateQueries(['issues']);
      toast.success('Assignee updated successfully');
    },
    onError: () => {
      toast.error('Failed to update assignee');
      setSelectedUser(issue.assignedTo?._id || '');
    },
  });

  const handleChange = (value) => {
    setSelectedUser(value);
    mutation.mutate(value);
  };

  const users = usersData?.data || [];

  return (
    <Select.Root value={selectedUser} onValueChange={handleChange}>
      <Select.Trigger placeholder="Assign to..." className="w-full" />
      <Select.Content>
        <Select.Item value="">Unassigned</Select.Item>
        {users.map((user) => (
          <Select.Item key={user._id} value={user._id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
