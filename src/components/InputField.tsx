import { Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';
import { theme } from 'theme';

type GeneralProps = {
  placeholder?: string;
  type?: string;
  value?: string;
  isReadOnly?: boolean;
};

type InputModeProps = InputProps & {
  multiline?: false;
};

type TextareaModeProps = TextareaProps & {
  multiline: true;
};

type Props = GeneralProps & (InputModeProps | TextareaModeProps);

const InputField = (props: Props): JSX.Element => {
  const isInputMode = (p: Props): p is GeneralProps & TextareaModeProps =>
    p.multiline === true;

  // Necesitamos destructurar las props adentro del if para que
  // TS no se enoje y tome bien los tipos.

  if (isInputMode(props)) {
    const { isReadOnly, placeholder, type, value, multiline, onChange, ...rest } = props;

    return (
      <Textarea
        {...rest}
        onChange={onChange}
        isReadOnly={isReadOnly}
        value={value}
        placeholder={placeholder}
        _placeholder={{ color: theme.colors.teachHub.gray }}
        bg={theme.colors.teachHub.white}
        fontSize={props.fontSize ? props.fontSize : theme.styles.global.body.fontSize}
        type={type}
      />
    );
  } else {
    const { isReadOnly, placeholder, type, value, multiline, onChange, ...rest } = props;

    return (
      <Input
        {...rest}
        onChange={onChange}
        isReadOnly={isReadOnly}
        value={value}
        placeholder={placeholder}
        _placeholder={{ color: theme.colors.teachHub.gray }}
        bg={theme.colors.teachHub.white}
        fontSize={props.fontSize ? props.fontSize : theme.styles.global.body.fontSize}
        type={type}
      />
    );
  }
};

export default InputField;
