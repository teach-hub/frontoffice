import {
  Card as ChakraCard,
  CardBody as ChakraBody,
  CardProps,
  CardBodyProps,
} from '@chakra-ui/react';
import { theme } from 'theme';

const defaultStyle = {
  background: theme.colors.teachHub.primaryLight,
  textColor: theme.colors.teachHub.white,
  borderColor: theme.colors.teachHub.black,
  borderRadius: '10px',
} as const;

// TODO. Revisar
// Es medio raro que setee 'display: flex;' para todos los hijos.

const CardBodyStyle = {
  display: 'flex',
  alignItems: 'center',
} as const;

type Props = CardProps & { bodyProps?: CardBodyProps };

export default ({ children, bodyProps, ...rest }: Props) => {
  const props = { ...defaultStyle, ...rest };
  const _bodyProps = { ...CardBodyStyle, ...bodyProps };
  return (
    <ChakraCard {...props}>
      <ChakraBody {..._bodyProps}>{children}</ChakraBody>
    </ChakraCard>
  );
};
