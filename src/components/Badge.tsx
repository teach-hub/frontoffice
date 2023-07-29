import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react';

type Props = BadgeProps;

const Badge = (props: Props) => {
  return <ChakraBadge borderRadius={'5px'} minW="fit-content" {...props} />;
};

export default Badge;
