import { Icon } from '@primer/octicons-react/dist/icons';
import { theme } from '../theme';
import { ListIcon as ChakraListIcon } from '@chakra-ui/react';

const ListIcon = ({ icon }: { icon: Icon }) => (
  <ChakraListIcon as={icon} color={theme.colors.teachHub.primary} boxSize={'6'} />
);

export default ListIcon;
