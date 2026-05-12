import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Flex, Grid, Heading } from '@radix-ui/themes';
import issueService from '../services/issueService';
import IssueDetails from '../components/issues/IssueDetails';
import IssueActions from '../components/issues/IssueActions';
import Skeleton from '../components/common/Skeleton';

const IssueDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['issue', id],
    queryFn: () => issueService.getIssue(id),
  });

  if (isLoading) {
    return (
      <Container>
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
          <Box className="md:col-span-4">
            <Skeleton height={40} className="mb-4" />
            <Skeleton height={300} />
          </Box>
          <Box>
            <Skeleton height={150} />
          </Box>
        </Grid>
      </Container>
    );
  }

  if (error || !data?.data) {
    return (
      <Container>
        <Heading size="5" color="red">
          Issue not found
        </Heading>
      </Container>
    );
  }

  const issue = data.data;

  return (
    <Container>
      <Grid columns={{ initial: '1', sm: '5' }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <IssueActions issue={issue} />
        </Box>
      </Grid>
    </Container>
  );
};

export default IssueDetail;
