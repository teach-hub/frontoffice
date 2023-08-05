import Button, { ButtonProps } from 'components/Button';
import { Flex } from '@chakra-ui/react';
import Text from 'components/Text';
import React from 'react';
import { Icon as OcticonsIcon } from '@primer/octicons-react/dist/icons';
import { Icon } from '@chakra-ui/icons';

type Props = ButtonProps & {
  text: string;
  icon: OcticonsIcon;
};

export const ButtonWithIcon = (props: Props) => {
  return (
    <Button width={'fit-content'} {...props}>
      <Flex align="center">
        <Icon as={props.icon} boxSize={6} marginRight={2} />
        <Text>{props.text}</Text>
      </Flex>
    </Button>
  );
};
