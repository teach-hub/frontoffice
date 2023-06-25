import { ListProps, List as ChakraList } from '@chakra-ui/react';

type Props = ListProps;

const List = (props: Props) => {
  return <ChakraList spacing={4} {...props} />;
};

export default List;
