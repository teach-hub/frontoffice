import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = SelectProps;

const Select = (props: Props) => {
  return (
    <ChakraSelect
      {...props}
      bg={theme.colors.teachHub.white}
      fontSize={theme.styles.global.body.fontSize}
    />
  );
};

export default Select;
