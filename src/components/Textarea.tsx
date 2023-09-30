import React from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = TextareaProps;

export default (props: Props) => {
  const { ...rest } = props;
  return (
    <Textarea
      // overflowY="hidden" // Hide the vertical scrollbar
      _placeholder={{ color: theme.colors.teachHub.gray }}
      bg={theme.colors.teachHub.white}
      fontSize={props.fontSize ? props.fontSize : theme.styles.global.body.fontSize}
      {...rest}
    />
  );
};
