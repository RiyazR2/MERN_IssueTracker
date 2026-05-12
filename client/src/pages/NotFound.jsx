import { Link } from 'react-router-dom';
import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';

const NotFound = () => {
  return (
    <Container>
      <Flex direction="column" align="center" justify="center" className="min-h-[60vh]" gap="4">
        <Heading size="9">404</Heading>
        <Heading size="5">Page Not Found</Heading>
        <Text size="3" color="gray">
          The page you're looking for doesn't exist.
        </Text>
        <Link to="/">
          <Button>Go to Dashboard</Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default NotFound;
