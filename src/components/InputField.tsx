import { ChangeEventHandler } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

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
      _placeholder={{ color: 'gray.400' }}
      type={type}
    />
  );
};

export default InputField;
