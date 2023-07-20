import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import { theme } from 'theme';

type Props = FormControlProps & {
  label: string;
  children: JSX.Element;
  helperText?: string;
  errorMessage?: string;
};

export const FormControl = ({
  label,
  helperText,
  children,
  isInvalid,
  errorMessage,
  ...rest
}: Props) => {
  const error = isInvalid !== undefined ? isInvalid : false;
  return (
    <ChakraFormControl isInvalid={error} {...rest}>
      <FormLabel fontWeight={'bold'} fontSize={theme.styles.global.body.fontSize}>
        {label}
      </FormLabel>
      {children}
      {!error ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </ChakraFormControl>
  );
};
