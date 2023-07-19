import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = { children: ReactNode } & FlexProps;

const PageDataContainer = ({ children, ...props }: Props) => {
  return (
    <Flex px={'50px'} py={'10px'} direction={'column'} {...props}>
      {children}
    </Flex>
  );
};

export default PageDataContainer;
