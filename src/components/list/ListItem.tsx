import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
  HStack,
  StackProps,
} from '@chakra-ui/react';

import ListIcon, { ListIconProps } from 'components/list/ListIcon';

export type ListItemProps = ChakraListItemProps & {
  iconProps: ListIconProps;
  label?: string;
  listItemKey?: string;
} & Pick<StackProps, 'children'>;

const ListItem = (props: ListItemProps) => {
  const { iconProps, label, listItemKey, children, ...rest } = props;

  return (
    <ChakraListItem {...rest}>
      <HStack>
        <ListIcon {...iconProps} key={listItemKey} />
        {label && <span style={{ fontWeight: 'bold' }}>{label}</span>}
        {children}
      </HStack>
    </ChakraListItem>
  );
};

export default ListItem;
