import { useQuery } from '@tanstack/react-query';
import { Container, Flex, Grid, Heading } from '@radix-ui/themes';
import issueService from '../services/issueService';
import IssueSummary from '../components/dashboard/IssueSummary';
import IssueChart from '../components/dashboard/IssueChart';
import LatestIssues from '../components/dashboard/LatestIssues';
import Skeleton from '../components/common/Skeleton';

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['issues'],
    queryFn: () => issueService.getIssues(),
  });

  const issues = data?.data || [];

  // Calculate statistics
  const stats = {
    open: issues.filter((issue) => issue.status === 'OPEN').length,
    inProgress: issues.filter((issue) => issue.status === 'IN_PROGRESS').length,
    closed: issues.filter((issue) => issue.status === 'CLOSED').length,
  };

  return (
    <Container>
      <Heading size="6" className="mb-6">
        Dashboard
      </Heading>

      <Grid columns={{ initial: '1', md: '2' }} gap="5" className="mb-6">
        {isLoading ? (
          <>
            <Skeleton height={100} />
            <Skeleton height={100} />
          </>
        ) : (
          <>
            <IssueSummary stats={stats} />
            <IssueChart data={stats} />
          </>
        )}
      </Grid>

      <div className="mt-8">
        {isLoading ? (
          <Skeleton count={5} height={60} className="mb-2" />
        ) : (
          <LatestIssues issues={issues.slice(0, 5)} />
        )}
      </div>
    </Container>
  );
};

export default Home;
