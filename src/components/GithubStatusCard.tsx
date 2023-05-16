import { StatProps, Flex, StatLabel, StatNumber, Stat } from '@chakra-ui/react';

import Box from 'components/Box';

import {
  CheckCircleIcon as CheckIcon,
  AlertIcon as CloseIcon,
  MarkGithubIcon,
} from '@primer/octicons-react';

type Props = {
  errored?: boolean;
} & StatProps;

export default ({ errored, ...rest }: Props) => {
  return (
    <Stat
      color={!errored ? 'green' : 'red'}
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'3px solid'}
      rounded={'lg'}
      {...rest}
    >
      <Flex>
        <Box my={'auto'} alignContent={'center'}>
          <MarkGithubIcon size="large" />
          <StatLabel fontSize={'xl'} fontWeight={'medium'} isTruncated>
            Github
          </StatLabel>
        </Box>
        <Box padding="10px" flex="1" pl={{ base: 2, md: 4 }}>
          <StatNumber textAlign={'right'} fontSize={'5xl'} fontWeight={'bold'}>
            {!errored ? <CheckIcon size="large" /> : <CloseIcon size="large" />}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  );
};
