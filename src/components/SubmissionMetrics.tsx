import { Flex, Stack } from '@chakra-ui/react';

import Heading from 'components/Heading';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

type Props = unknown;

const CommitCount = () => {
  return (
    <Flex gap="5px" p="20px" alignItems={'center'} direction={'column'}>
      <Avatar name="tomas lopez" size="lg" />
      <Text fontSize={'xl'}>35 commits</Text>
    </Flex>
  );
};

function SubmissionMetrics(props: Props) {
  return (
    <Stack maxW="50%" flex="1" gap={'20px'}>
      <Heading size={'md'}>Métricas</Heading>
      <Text>Primer commit hecho el: </Text>
      <Text>Ultimo commit hecho el: </Text>
      <Flex wrap="wrap" alignItems="center" justifyContent={'space-evenly'}>
        <CommitCount />
        <CommitCount />
      </Flex>
      <Text>Mas informacion en </Text>
    </Stack>
  );
}

export default SubmissionMetrics;
