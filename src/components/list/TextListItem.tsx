import ListItem, { ListItemProps } from 'components/list/ListItem';
import { ListIconProps } from 'components/list/ListIcon';
import { Nullable } from 'types';

export type TextListItemProps = {
  text?: Nullable<string>;
  label?: string;
  key: string;
  iconProps: ListIconProps;
};

export const TextListItem = ({ label, text, iconProps, key }: TextListItemProps) => {
  const listItemProps: ListItemProps = {
    iconProps,
    children: <span>{text || '-'}</span>,
    key,
    label,
  };
  return <ListItem {...listItemProps} />;
};
