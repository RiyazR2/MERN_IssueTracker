import SkeletonLoader from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Skeleton = ({ ...props }) => {
  return <SkeletonLoader {...props} />;
};

export default Skeleton;
