import { AvatarGroup } from '@chakra-ui/react';

import Box from 'components/Box';
import Card from 'components/Card';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import CrossIcon from 'icons/CrossIcon';

type UserRevieweeCardProps = {
  readonly revieweeInfo: { name: string; lastName: string; file: string };
  onRemove?: () => void;
};

type GroupRevieweeCardProps = {
  readonly revieweeInfo: { groupName: string; participants: { name: string }[] };
  onRemove?: () => void;
};

const _Card = ({
  children,
}: {
  children: Array<JSX.Element | undefined> | JSX.Element;
}) => {
  return (
    <Card bodyProps={{ gap: '10px' }} w="100%" opacity={'80%'}>
      {children}
    </Card>
  );
};

const UserRevieweeCard = ({
  revieweeInfo: { name, lastName, file },
  onRemove,
}: UserRevieweeCardProps) => (
  <_Card>
    <Avatar name={`${name} ${lastName}`} />
    <Text>
      {name} {lastName} - {file}
    </Text>
    {onRemove && (
      <Box onClick={() => onRemove()}>
        <CrossIcon />
      </Box>
    )}
  </_Card>
);

const GroupRevieweeCard = ({ revieweeInfo, onRemove }: GroupRevieweeCardProps) => (
  <_Card>
    <AvatarGroup max={2} size="sm" textColor="black">
      {revieweeInfo.participants.map((reviewee, i) => (
        <Avatar key={i} name={`${reviewee.name}`} />
      ))}
    </AvatarGroup>
    <Text>
      {revieweeInfo.groupName} - ({revieweeInfo.participants.map(p => p.name).join(', ')})
    </Text>
    {onRemove && (
      <Box onClick={() => onRemove()}>
        <CrossIcon size="small" />
      </Box>
    )}
  </_Card>
);

export { GroupRevieweeCard, UserRevieweeCard };
