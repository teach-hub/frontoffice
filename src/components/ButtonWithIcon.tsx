import Button, { ButtonProps } from 'components/Button';
import React from 'react';
import { Icon as OcticonsIcon } from '@primer/octicons-react/dist/icons';
import { Icon } from '@chakra-ui/icons';

type Props = ButtonProps & {
  text: string;
  icon: OcticonsIcon;
};

export const ButtonWithIcon = (props: Props) => {
  return (
    <Button
      leftIcon={<Icon as={props.icon} boxSize={6} marginRight={2} />}
      width={'fit-content'}
      {...props}
    >
      {props.text}
    </Button>
  );
};
