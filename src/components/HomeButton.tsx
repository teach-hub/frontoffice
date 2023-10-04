import { BoxProps, Image as ChakraImage, SkeletonCircle } from '@chakra-ui/react';

import Box from 'components/Box';

type Props = BoxProps;

const HomeIconFallback = () => {
  return <SkeletonCircle boxSize={'60px'} />;
};

export default (props: Props) => {
  return (
    <Box
      _hover={{
        cursor: 'pointer',
      }}
      {...props}
    >
      <ChakraImage
        fallback={<HomeIconFallback />}
        src={require('../assets/logo_wo_text.png')}
      />
    </Box>
  );
};
