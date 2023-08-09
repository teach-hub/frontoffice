import { LinkExternalIcon, LinkIcon } from '@primer/octicons-react';
import ListItem, { ListItemProps } from 'components/list/ListItem';
import Link from 'components/Link';
import { Link as RRLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

import { theme } from 'theme';

export type LinkListItemProps = {
  text: string;
  link: string;
  label?: string;
  listItemKey: string;
  iconColor: string;
  external: boolean;
  disabled?: boolean;
};

export const LinkListItem = ({
  label,
  text,
  link,
  iconColor,
  listItemKey,
  external,
  disabled,
}: LinkListItemProps) => {
  let children = null;

  if (disabled) {
    children = <Text color={theme.colors.teachHub.gray}>{text}</Text>;
  } else {
    if (external) {
      children = (
        <Link href={link} isExternal>
          {text}
        </Link>
      );
    } else {
      children = (
        <Link as={RRLink} to={link}>
          {text}
        </Link>
      );
    }
  }

  const updatedItemProps: Omit<ListItemProps, 'children'> = {
    iconProps: {
      icon: external ? LinkExternalIcon : LinkIcon,
      color: disabled ? theme.colors.teachHub.gray : iconColor,
    },
    listItemKey,
    label,
  };

  return <ListItem {...updatedItemProps}>{children}</ListItem>;
};
