import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import issueService from '../../services/issueService';
import Spinner from '../common/Spinner';

const DeleteIssueButton = ({ issueId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => issueService.deleteIssue(issueId),
    onSuccess: () => {
      queryClient.invalidateQueries(['issues']);
      toast.success('Issue deleted successfully');
      navigate('/issues');
    },
    onError: () => {
      toast.error('Failed to delete issue');
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger>
        <Button color="red" className="w-full cursor-pointer">
          <TrashIcon /> Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={handleDelete}
              disabled={mutation.isPending}
              className="cursor-pointer"
            >
              {mutation.isPending ? <Spinner size="sm" /> : 'Delete'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
