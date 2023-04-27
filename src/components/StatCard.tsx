import { ReactNode } from 'react';
import { Box, Flex, StatLabel, StatNumber, Stat } from '@chakra-ui/react';

type Props = {
  title: string;
  stat: string;
  icon: ReactNode;
};

export default ({ title, stat, icon }: Props) => {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      rounded={'lg'}
    >
      <Flex>
        <Box my={'auto'} alignContent={'center'}>
          {icon}
          <StatLabel fontSize={'xl'} fontWeight={'medium'} isTruncated>
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
  );
};
