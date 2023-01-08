import { MouseEventHandler } from 'react';

import {
  Box,
  Avatar,
  IconButton,
  Center,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

type Props = {
  url?: string;
  name?: string;
  onEdit?: MouseEventHandler;
}

const AvatarImage = ({ url, name, onEdit }: Props) => {
  return (
    <Box boxSizing="border-box" padding="90px" flex="1">
      <Center>
        <Avatar shadow="2xl" size="full" src={url} name={name} />
      </Center>
      <Box display="flex" position="relative" top="-90px">
        <IconButton onClick={onEdit} bgColor="gray.300" w="auto" h="auto" rounded={30} marginLeft="auto" aria-label='edit photo icon' icon={<EditIcon h="90px" w="90px"/>} />
      </Box>
    </Box>
  );
}

export default AvatarImage;
