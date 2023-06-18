import { SkeletonCircle, BoxProps, Image as ChakraImage } from '@chakra-ui/react';

import Box from 'components/Box';

type Props = BoxProps;

const HomeIconFallback = () => {
  return <SkeletonCircle boxSize={'60px'} />;
};

export default (props: Props) => {
  return (
    <Box
      _hover={{
        transition: '.3s',
        filter: 'blur(1px)',
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
