import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = CheckboxProps;

export const Checkbox = ({ id, isChecked, onChange, ...rest }: Props) => {
  return (
    <ChakraCheckbox
      id={id}
      size={'lg'}
      borderColor={theme.colors.teachHub.black}
      bg={theme.colors.teachHub.white}
      isChecked={isChecked}
      onChange={onChange}
      width={'fit-content'}
      {...rest}
    />
  );
};
