import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

const PageDataContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex paddingX={'50px'} paddingY={'10px'} direction={'column'}>
      {children}
    </Flex>
  );
};

export default PageDataContainer;
