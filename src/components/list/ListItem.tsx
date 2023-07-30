import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
  Stack,
} from '@chakra-ui/react';
import ListIcon, { ListIconProps } from 'components/list/ListIcon';

export type ListItemProps = ChakraListItemProps & {
  iconProps: ListIconProps;
  label?: string;
  children: JSX.Element;
  listItemKey: string;
};

const ListItem = ({
  iconProps,
  label,
  listItemKey,
  children,
  ...rest
}: ListItemProps) => {
  return (
    <ChakraListItem {...rest}>
      <Stack direction={'row'}>
        <ListIcon {...iconProps} key={listItemKey} />
        {label && <span style={{ fontWeight: 'bold' }}>{label}</span>}
        {children}
      </Stack>
    </ChakraListItem>
  );
};

export default ListItem;
