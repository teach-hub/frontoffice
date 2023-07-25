import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';

type Props = HeadingProps;

export const Heading = (props: Props) => {
  return <ChakraHeading {...props} />;
};

export default Heading;
