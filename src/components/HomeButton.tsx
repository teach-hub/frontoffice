import { Image as ChakraImage, ImageProps, Link as ChakraLink } from '@chakra-ui/react';

import Box from 'components/Box';

type Props = {
  onClick: ImageProps['onClick'];
};

export default (props: Props) => {
  return (
    <Box
      _hover={{
        transition: '.3s',
        filter: 'blur(1px)',
        cursor: 'pointer',
      }}
    >
      <ChakraImage
        onClick={props.onClick}
        h="70px"
        w="60px"
        src={require('../assets/logo_wo_text.png')}
      />
    </Box>
  );
};
