import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react';

type Props = BadgeProps;

const Badge = (props: Props) => {
  return <ChakraBadge orientation="vertical" borderRadius={'5px'} {...props} />;
};

export default Badge;
