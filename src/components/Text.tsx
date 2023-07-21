import { Text as ChakraText, TextProps } from '@chakra-ui/react';

type Props = TextProps;

const Text = (props: Props) => {
  return <ChakraText whiteSpace={'pre-line'} {...props} />;
};

export default Text;
