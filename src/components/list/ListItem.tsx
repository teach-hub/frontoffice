import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from '@chakra-ui/react';
import ListIcon, { ListIconProps } from 'components/list/ListIcon';

export type ListItemProps = ChakraListItemProps & {
  iconProps: ListIconProps;
  label?: string;
  children: JSX.Element;
};

const ListItem = ({ iconProps, label, children, ...rest }: ListItemProps) => {
  return (
    <ChakraListItem {...rest}>
      <ListIcon {...iconProps} />
      {label && <span style={{ fontWeight: 'bold' }}>{label}</span>}
      {children}
    </ChakraListItem>
  );
};

export default ListItem;
