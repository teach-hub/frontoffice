import { Icon } from '@primer/octicons-react/dist/icons';
import { theme } from 'theme';
import { IconProps, ListIcon as ChakraListIcon } from '@chakra-ui/react';

type Props = IconProps & { icon: Icon };

const ListIcon = ({ icon, ...rest }: Props) => (
  <ChakraListIcon
    as={icon}
    color={theme.colors.teachHub.primary}
    boxSize={'6'}
    {...rest}
  />
);

export default ListIcon;
