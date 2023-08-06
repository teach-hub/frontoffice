import ListItem, { ListItemProps } from 'components/list/ListItem';
import { ListIconProps } from 'components/list/ListIcon';
import { Nullable } from 'types';

export type TextListItemProps = {
  text?: Nullable<string>;
  label?: string;
  listItemKey: string;
  iconProps: ListIconProps;
};

export const TextListItem = (props: TextListItemProps) => {
  const listItemProps: ListItemProps = {
    iconProps: props.iconProps,
    listItemKey: props.listItemKey,
    label: props.label,
  };

  return (
    <ListItem {...listItemProps}>
      <span>{props.text || '-'}</span>
    </ListItem>
  );
};
