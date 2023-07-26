import { formatAsSimpleDateTime } from 'utils/dates';
import { Nullable } from 'types';
import { TextListItem } from 'components/list/TextListItem';
import { CalendarIcon } from '@primer/octicons-react';

type Props = {
  date: Nullable<string>;
  label: string;
  listItemKey: string;
  iconColor: string;
};

export const DateListItem = ({ date, label, listItemKey, iconColor }: Props) => {
  const text = date ? formatAsSimpleDateTime(date) : '-';
  return (
    <TextListItem
      listItemKey={listItemKey}
      label={label}
      text={text}
      iconProps={{
        color: iconColor,
        icon: CalendarIcon,
      }}
    />
  );
};
