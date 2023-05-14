import { IconButton, Badge } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import Heading from 'components/Heading';
import Box from 'components/Box';
import Card from 'components/Card';
import Text from 'components/Text';

type Props = {
  user: {
    name: string;
    lastName: string;
    roleName: string;
    file: string;
  };
};

const RoleNameBadge = ({ roleName }: { roleName: string }) => {
  return (
    <Badge fontSize="md" variant="solid" colorScheme="green">
      {roleName}
    </Badge>
  );
};

export default ({ user }: Props) => {
  const { roleName, file, name, lastName } = user;

  const userFullName = `${name} ${lastName}`;

  return (
    <Card>
      <Heading flex="1" size="md">
        {userFullName}
        <Heading size="xs">What</Heading>
      </Heading>

      <Badge
        marginRight="40px"
        marginLeft="40px"
        fontSize="sm"
        variant="subtle"
        colorScheme="blue"
      >
        {file}
      </Badge>

      {roleName && <RoleNameBadge roleName={roleName} />}

      <Box display="flex" flexDirection="row-reverse" alignItems="center" flex="1">
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<CloseIcon />}
        />
      </Box>
    </Card>
  );
};
