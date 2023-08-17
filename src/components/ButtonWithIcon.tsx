import Button, { ButtonProps } from 'components/Button';
import React from 'react';
import { Icon as OcticonsIcon } from '@primer/octicons-react';
import { Icon } from '@chakra-ui/icons';

type Props = ButtonProps & {
  text: string;
  icon: OcticonsIcon;
};

export const ButtonWithIcon = (props: Props) => {
  const { text, icon, ...restProps } = props;

  return (
    <Button
      leftIcon={<Icon as={icon} boxSize={6} marginRight={2} />}
      width={'fit-content'}
      {...restProps}
    >
      {text}
    </Button>
  );
};
