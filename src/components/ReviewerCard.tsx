import { StackProps, HStack, Text, Avatar } from '@chakra-ui/react';

type Props = StackProps & {
  reviewerInfo: { name: string; lastName: string };
};

const ReviewerCard = ({ reviewerInfo: { name, lastName }, ...rest }: Props) => (
  <HStack
    borderWidth="1px"
    borderColor="black"
    borderRadius="15px"
    justifyContent="center"
    {...rest}
  >
    <Avatar name={`${name} ${lastName}`} size="md" />
    <Text maxW="50%">
      {name} {lastName}
    </Text>
  </HStack>
);

export default ReviewerCard;
