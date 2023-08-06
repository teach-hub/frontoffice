import { Icon } from '@primer/octicons-react/dist/icons';
import { theme } from 'theme';
import { IconProps, ListIcon as ChakraListIcon } from '@chakra-ui/react';

export type ListIconProps = IconProps & {
  icon: Icon;
  color?: string;
};

const ListIcon = (props: ListIconProps) => {
  const { color = theme.colors.teachHub.primary, icon, ...rest } = props;

  return <ChakraListIcon as={icon} color={color} boxSize={'6'} {...rest} />;
};

export default ListIcon;
