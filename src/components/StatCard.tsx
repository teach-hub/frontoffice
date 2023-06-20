import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatProps,
  Tooltip,
} from '@chakra-ui/react';

import { Nullable } from 'types';
import { theme } from 'theme';

type Props = {
  title: string;
  stat: string | ReactNode;
  icon: ReactNode;
  border?: string;
  tooltipLabel?: Nullable<string>;
} & StatProps;

export default ({ title, border, stat, icon, tooltipLabel, ...rest }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tooltip
      hasArrow
      label={tooltipLabel}
      isOpen={isHovered}
      fontSize={theme.styles.global.body.fontSize}
    >
      <Stat
        shadow={'xl'}
        border={border ? border : '1px solid'}
        rounded={'lg'}
        _hover={{ cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <Flex marginX={{ base: 2, md: 4 }} marginY={5}>
          <Box my={'auto'} alignContent={'center'}>
            {icon}
            <StatLabel
              fontSize={theme.styles.global.body.fontSize}
              fontWeight={'medium'}
              isTruncated
            >
              {title}
            </StatLabel>
          </Box>
          <Box padding="10px" flex="1" pl={{ base: 2, md: 4 }}>
            <StatNumber textAlign={'right'} fontSize={'5xl'} fontWeight={'bold'}>
              {stat}
            </StatNumber>
          </Box>
        </Flex>
      </Stat>
    </Tooltip>
  );
};
