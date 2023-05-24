import { ReactNode } from 'react';
import { List as ChakraList } from '@chakra-ui/react';

export const List = ({ children }: { children: ReactNode }) => {
  return <ChakraList spacing={4}>{children}</ChakraList>;
};
