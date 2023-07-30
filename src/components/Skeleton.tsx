import { Skeleton as ChakraSkeleton, SkeletonProps } from '@chakra-ui/react';

type Props = SkeletonProps;

function Skeleton(props: Props) {
  return <ChakraSkeleton {...props} />;
}

export default Skeleton;
