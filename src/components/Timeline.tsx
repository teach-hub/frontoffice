import {
  VStack,
  Heading,
  Box,
  Container,
  BoxProps,
  Circle,
  Flex,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

// Here we have used react-icons package for the icons
import { FiCheckCircle } from 'react-icons/fi';

type TimelineProps = {
  title: string;
  children: ReactNode | ReactNode[];
};

const Timeline = (props: TimelineProps) => {
  const { children, title } = props;

  return (
    <Container maxW="3xl" m={0} p={{ base: 0 }}>
      <VStack textAlign="start" align="start" mb={0}>
        <Box zIndex={5}>
          <Heading fontSize="xl" fontWeight="600" my={5}>
            {title}
          </Heading>
          <Box>{children}</Box>
        </Box>
      </VStack>
    </Container>
  );
};

interface TimelineItemProps extends BoxProps {
  // eslint-disable-next-line
  icon?: any;
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  return (
    <Flex fontSize="md" minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle size={10} borderColor="teachHub.black" borderWidth="1.25px" />
        <Box
          as={icon}
          size=".90rem"
          color="teachHub.green"
          pos="absolute"
          top="0.875rem"
        />
        {!skipTrail && <Box w="1px" flex={1} bg="teachHub.black" my={0} />}
      </Flex>
      <Box pt={{ base: 0, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export { Timeline, TimelineItem };
