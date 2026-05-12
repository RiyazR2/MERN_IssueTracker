import { Callout } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorMessage = ({ children }) => {
  if (!children) return null;

  return (
    <Callout.Root color="red" className="mb-5">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorMessage;
