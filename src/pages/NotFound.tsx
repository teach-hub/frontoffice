import Navigation from 'components/Navigation';
import { Suspense } from 'react';
import { Center, Image, Stack } from '@chakra-ui/react';
import Heading from 'components/Heading';
import logo from 'assets/logo_wo_text.png';
import Text from 'components/Text';

const NotFoundPage = () => {
  return (
    <Navigation>
      <Suspense>
        <Center height="70vh">
          <Stack
            width={'100%'}
            height={'100%'}
            direction={'column'}
            align={'center'}
            justify={'center'}
            gap={20}
          >
            <Image src={logo} />
            <Stack justify={'center'} alignItems={'center'}>
              <Heading>404</Heading>
              <Text>Page not found</Text>
            </Stack>
          </Stack>
        </Center>
      </Suspense>
    </Navigation>
  );
};

export default NotFoundPage;
