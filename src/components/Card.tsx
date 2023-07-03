import { Card as ChakraCard, CardBody as ChakraBody, CardProps } from '@chakra-ui/react';
import { theme } from 'theme';

const defaultStyle = {
  background: theme.colors.teachHub.primaryLight,
  textColor: theme.colors.teachHub.white,
  borderColor: theme.colors.teachHub.black,
  borderRadius: '10px',
} as const;

const CardBodyStyle = {
  display: 'flex',
  alignItems: 'center',
} as const;

type Props = CardProps;

export default ({ children, ...rest }: Props) => {
  const props = { ...defaultStyle, ...rest };
  return (
    <ChakraCard {...props}>
      <ChakraBody {...CardBodyStyle}>{children}</ChakraBody>
    </ChakraCard>
  );
};
