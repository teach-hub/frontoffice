import { ChangeEventHandler } from 'react';
import { InputProps } from '@chakra-ui/react';
import InputField from './InputField';
import { formatDateString } from '../utils/dates';

type Props = InputProps & {
  placeholder?: string;
  type?: string;
  value?: string;
  isReadOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const INPUT_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

const DateInputField = ({ value, ...rest }: Props): JSX.Element => {
  return (
    <InputField
      {...rest}
      value={value ? formatDateString(value, INPUT_DATE_FORMAT) : undefined}
      type={'datetime-local'}
    />
  );
};

export default DateInputField;
