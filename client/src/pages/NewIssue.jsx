import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Heading } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import issueService from '../services/issueService';
import IssueForm from '../components/issues/IssueForm';

const NewIssue = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: issueService.createIssue,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['issues']);
      toast.success('Issue created successfully');
      navigate(`/issues/${data.data._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create issue');
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container size="3">
      <Heading size="6" className="mb-6">
        Create New Issue
      </Heading>
      <IssueForm onSubmit={handleSubmit} isSubmitting={mutation.isPending} />
    </Container>
  );
};

export default NewIssue;
