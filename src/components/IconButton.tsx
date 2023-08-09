import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';

type Props = IconButtonProps;

const IconButton = (props: Props): JSX.Element => {
  const { children, ...rest } = props;

  return <ChakraIconButton {...rest}>{children}</ChakraIconButton>;
};

export default IconButton;
