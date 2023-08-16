import { theme } from 'theme';
import IconButton from 'components/IconButton';
import CrossIcon from 'icons/CrossIcon';
import Text from 'components/Text';
import { Flex } from '@chakra-ui/react';
import React from 'react';

export const FilterBadge = ({
  text,
  iconAriaLabel,
  onClick,
}: {
  text: string;
  iconAriaLabel: string;
  onClick: () => void;
}) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'flex-start'}
      backgroundColor={theme.colors.teachHub.gray}
      borderRadius={'10'}
      paddingRight={'2'}
    >
      <IconButton
        backgroundColor={'transparent'}
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={iconAriaLabel}
        icon={<CrossIcon />}
        borderRadius={'10'}
        size={'sm'}
        onClick={onClick}
      />
      <Text fontSize={'15'}>{text}</Text>
    </Flex>
  );
};
