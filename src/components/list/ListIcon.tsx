import { Icon } from '@primer/octicons-react/dist/icons';
import { theme } from 'theme';
import { IconProps, ListIcon as ChakraListIcon } from '@chakra-ui/react';

export type ListIconProps = IconProps & {
  icon: Icon;
  color?: string;
};

const ListIcon = ({ color, icon, ...rest }: ListIconProps) => (
  <ChakraListIcon
    as={icon}
    color={color || theme.colors.teachHub.primary}
    boxSize={'6'}
    {...rest}
  />
);

export default ListIcon;
