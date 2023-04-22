import { MouseEventHandler } from 'react';

import { Avatar, Box, Center, IconButton } from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

type Props = {
  url?: string;
  name?: string;
  isEditing?: boolean;
  onEdit?: MouseEventHandler;
};

const AvatarImage = ({ url, name, onEdit, isEditing }: Props) => {
  return (
    <Box boxSizing="border-box" paddingX="40px">
      <Center>
        <Avatar shadow="2xl" width="20em" height="20em" src={url} name={name} />
      </Center>
      {!isEditing && (
        <Box display="flex" position="relative">
          {/* TODO: refactor edit button and avatar image*/}
          <IconButton
            variant={'ghost'}
            onClick={onEdit}
            w="auto"
            h="auto"
            rounded={30}
            marginLeft="auto"
            aria-label="edit photo icon"
            icon={<EditIcon h="4vw" w="4vw" />}
            _hover={{ backgroundColor: 'lightGray', cursor: 'pointer' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AvatarImage;
