import { Suspense } from 'react';

import { Stack, Badge, Flex, HStack } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import Divider from 'components/Divider';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Card from 'components/Card';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Box from 'components/Box';
import Button from 'components/Button';

const AssignmentSettings = () => {
  return (
    <Card opacity="90%" bg="white" variant="elevated" w="500px" alignItems="stretch">
      <Stack flex="1" bgColor="blue">
        <Text opacity={100} fontSize={'20'} fontStyle="bold" color="black">
          Configuracion
        </Text>
        <Button>Asignar</Button>
      </Stack>
    </Card>
  );
};

const ReviewerAssignment = () => {
  return (
    <Flex direction={'row'} alignItems={'center'} margin="20px 0" marginBlockStart="0px">
      <HStack
        borderWidth="1px"
        borderColor="grey"
        borderRadius="10px"
        justifyContent="center"
        h="70px"
        w="15%"
      >
        <Avatar size="md" />
        <Text w="50%" fontSize="17px">
          {' '}
          Nombre Apellido
        </Text>
      </HStack>
      <ArrowForwardIcon color="black" boxSize={'30px'} margin="0px 18px" />
      <Card flex="1" opacity={'80%'} alignContent="space-around">
        <HStack flex="1">
          <Avatar margin="0px 10px" size="sm" />
          <Text>Nombre Apellido</Text>
          <Text>-</Text>
          <Text>99840</Text>
        </HStack>
        <Badge borderRadius="5px">Test</Badge>
      </Card>
    </Flex>
  );
};

const AssignPreview = () => {
  const numbers = [];
  for (let i = 0; i < 50; i++) {
    numbers.push(i);
  }

  return (
    <Flex direction="column" grow="4" overflowY={'auto'}>
      {numbers.map(() => {
        return <ReviewerAssignment />;
      })}
    </Flex>
  );
};

const PageContent = () => {
  return (
    <PageDataContainer>
      <Heading margin="20px 0px">Asignar correctores</Heading>
      <HStack
        alignItems={'stretch'}
        h="800px"
        divider={
          <Box alignSelf="center" h="90%">
            <Divider margin="0px 30px" />
          </Box>
        }
      >
        <AssignmentSettings />
        <AssignPreview />
      </HStack>
    </PageDataContainer>
  );
};

const AssignReviewersPage = () => {
  return (
    <Navigation>
      <Suspense>
        <PageContent />
      </Suspense>
    </Navigation>
  );
};

export default AssignReviewersPage;
