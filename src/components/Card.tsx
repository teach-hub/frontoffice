import { Card as ChakraCard, CardBody as ChakraBody, CardProps } from '@chakra-ui/react';
import { theme } from '../theme';

const CardStyle = {
  shadow: 'md',
  background: theme.colors.teachHub.primaryLight,
  color: theme.colors.teachHub.white,
  variant: 'outline',
  borderColor: theme.colors.teachHub.black,
  borderWidth: '1px',
  borderRadius: '10px',
} as const;

const CardBodyStyle = {
  display: 'flex',
  alignItems: 'center',
} as const;

type Props = CardProps;

export default ({ children, ...rest }: Props) => {
  return (
    <ChakraCard sx={CardStyle} {...rest}>
      <ChakraBody sx={CardBodyStyle}>{children}</ChakraBody>
    </ChakraCard>
  );
};
