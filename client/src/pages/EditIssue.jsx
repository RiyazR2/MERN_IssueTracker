import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Heading } from '@radix-ui/themes';
import toast from 'react-hot-toast';
import issueService from '../services/issueService';
import IssueForm from '../components/issues/IssueForm';
import Skeleton from '../components/common/Skeleton';

const EditIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['issue', id],
    queryFn: () => issueService.getIssue(id),
  });

  const mutation = useMutation({
    mutationFn: (updateData) => issueService.updateIssue(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['issue', id]);
      queryClient.invalidateQueries(['issues']);
      toast.success('Issue updated successfully');
      navigate(`/issues/${id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update issue');
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Container size="3">
        <Skeleton height={40} className="mb-6" />
        <Skeleton height={400} />
      </Container>
    );
  }

  if (!data?.data) {
    return (
      <Container size="3">
        <Heading size="5" color="red">
          Issue not found
        </Heading>
      </Container>
    );
  }

  return (
    <Container size="3">
      <Heading size="6" className="mb-6">
        Edit Issue
      </Heading>
      <IssueForm
        onSubmit={handleSubmit}
        defaultValues={data.data}
        isSubmitting={mutation.isPending}
      />
    </Container>
  );
};

export default EditIssue;
