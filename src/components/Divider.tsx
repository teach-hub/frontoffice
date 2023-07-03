import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = DividerProps;

const Divider = (props: Props) => {
  return (
    <ChakraDivider
      borderColor={theme.colors.teachHub.primary}
      orientation="vertical"
      {...props}
    />
  );
};

export default Divider;
