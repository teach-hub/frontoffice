import { ChangeEventHandler } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = InputProps & {
  placeholder?: string;
  type?: string;
  value?: string;
  isReadOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const InputField = ({
  isReadOnly,
  placeholder,
  type,
  value,
  onChange,
  ...rest
}: Props): JSX.Element => {
  return (
    <Input
      {...rest}
      onChange={onChange}
      isReadOnly={isReadOnly}
      value={value}
      placeholder={placeholder}
      _placeholder={{ color: theme.colors.teachHub.gray }}
      bg={theme.colors.teachHub.white}
      fontSize={theme.styles.global.body.fontSize}
      type={type}
    />
  );
};

export default InputField;
