import { Nullable } from 'types';
import { ListItem } from '@chakra-ui/react';
import { theme } from 'theme';
import { CalendarIcon } from '@primer/octicons-react';
import { formatAsSimpleDateTime } from 'utils/dates';
import ListIcon from 'components/ListIcon';

type Props = {
  date: Nullable<string>;
  text: string;
  itemKey: string;
};

export const DateListItem = ({ date, text, itemKey }: Props) => (
  <ListItem key={itemKey}>
    <ListIcon color={theme.colors.teachHub.white} icon={CalendarIcon} />
    <span style={{ fontWeight: 'bold' }}>{text}</span>
    {date ? formatAsSimpleDateTime(date) : '-'}
  </ListItem>
);
