import { Badge as ChakraBadge, BadgeProps, Flex } from '@chakra-ui/react';

type Props = BadgeProps;

const Badge = (props: Props) => {
  return (
    <Flex
      alignItems="center" // Vertically center the content
      justifyContent="center" // Horizontally center the content
    >
      <ChakraBadge
        borderRadius={'5px'}
        display="flex" // Set display to flex to enable Flexbox
        alignItems="center" // Vertically center the content
        justifyContent="center" // Horizontally center the content
        minW="fit-content"
        minH="fit-content"
        h="30px"
        {...props}
      />
    </Flex>
  );
};

export default Badge;
