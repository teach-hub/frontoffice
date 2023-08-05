import { MouseEventHandler } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type ButtonProps = ChakraButtonProps & {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
  h?: string;
  w?: string;
  bg?: string;
  color?: string;
  colorScheme?: string;
  _hover?: Record<string, string>;
};

const Button = ({
  children,
  onClick,
  colorScheme,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <ChakraButton {...rest} onClick={onClick} colorScheme={colorScheme}>
      {children}
    </ChakraButton>
  );
};

export default Button;
