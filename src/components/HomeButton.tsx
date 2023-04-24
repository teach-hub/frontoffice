import {
  BoxProps,
  Image as ChakraImage,
  ImageProps,
  Link as ChakraLink,
} from '@chakra-ui/react';

import Box from 'components/Box';

type Props = BoxProps;

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
      <ChakraImage src={require('../assets/logo_wo_text.png')} />
    </Box>
  );
};
