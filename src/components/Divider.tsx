import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react';

type Props = DividerProps;

export default (props: Props) => {
  return <ChakraDivider orientation="vertical" {...props} />;
};
