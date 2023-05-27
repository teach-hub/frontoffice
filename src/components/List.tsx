import { ReactNode } from 'react';
import { List as ChakraList } from '@chakra-ui/react';

const List = ({ children }: { children: ReactNode }) => {
  return <ChakraList spacing={4}>{children}</ChakraList>;
};

export default List;
