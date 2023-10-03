import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RRLink, LinkProps as RRLinkProps } from 'react-router-dom';

type Props = RRLinkProps & {
  disabled?: boolean;
};

const Link = (props: Props) => {
  return (
    <ChakraLink
      as={RRLink}
      {...props}
      style={{ pointerEvents: props.disabled ? 'none' : undefined }}
    />
  );
};
export default Link;
