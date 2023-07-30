import {
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertProps,
} from '@chakra-ui/react';

type Props = AlertProps & { showIcon?: boolean };

function Alert(props: Props) {
  const { children, showIcon = true, ...rest } = props;

  return (
    <ChakraAlert {...rest}>
      {showIcon && <ChakraAlertIcon />}
      {children}
    </ChakraAlert>
  );
}

export default Alert;
