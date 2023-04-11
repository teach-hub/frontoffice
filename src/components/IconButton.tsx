import { MouseEventHandler } from 'react';
import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';

type Props = IconButtonProps & {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
  h?: string;
  w?: string;
  bg?: string;
  color?: string;
  colorScheme?: string;
  _hover?: Record<string, string>;
};

const IconButton = ({ children, ...rest }: Props): JSX.Element => {
  return <ChakraIconButton {...rest}>{children}</ChakraIconButton>;
};

export default IconButton;
