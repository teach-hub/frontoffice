import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';

type Props = AvatarProps;

const Avatar = (props: Props) => {
  return (
    <ChakraAvatar
      {...props}
      _hover={{
        transition: '.3s',
        filter: 'blur(1px)',
        cursor: 'pointer',
      }}
      borderWidth="1px"
      borderColor="black.900"
    />
  );
};

export default Avatar;
