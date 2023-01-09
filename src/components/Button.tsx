import { MouseEventHandler } from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  children?: JSX.Element | string;
  onClick?: MouseEventHandler;
  h?: string;
  w?: string;
  bg?: string;
  color?: string;
  colorScheme?: string;
  _hover?: Record<string, string>;
}

const Button = ({children, onClick, colorScheme, ...rest}: Props): JSX.Element => {
  return (
    <ChakraButton {...rest} onClick={onClick} colorScheme={colorScheme}>
      {children}
    </ChakraButton>
  );
}

export default Button;
