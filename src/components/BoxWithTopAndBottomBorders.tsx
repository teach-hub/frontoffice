import { Box as ChakraBox, BoxProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = BoxProps;

const Box = (props: Props) => {
  return (
    <ChakraBox
      {...props}
      borderColor={theme.colors.teachHub.gray}
      borderWidth={1} // Put borders only on top and bottom
      borderLeftWidth={0}
      borderRightWidth={0}
      padding={5}
    />
  );
};
export default Box;
