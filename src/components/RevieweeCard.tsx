import { AvatarGroup } from '@chakra-ui/react';

import Card from 'components/Card';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

type UserRevieweeCardProps = {
  readonly revieweeInfo: { name: string; lastName: string; file: string };
};

type GroupRevieweeCardProps = {
  readonly revieweeInfo: { groupName: string; participants: { name: string }[] };
};

const _Card = ({ children }: { children: JSX.Element[] }) => {
  return (
    <Card bodyProps={{ gap: '10px' }} w="100%" opacity={'80%'}>
      {children}
    </Card>
  );
};

const UserRevieweeCard = ({
  revieweeInfo: { name, lastName, file },
}: UserRevieweeCardProps) => (
  <_Card>
    <Avatar name={`${name} ${lastName}`} />
    <Text>
      {name} {lastName} - {file}
    </Text>
  </_Card>
);

const GroupRevieweeCard = ({ revieweeInfo }: GroupRevieweeCardProps) => (
  <_Card>
    <AvatarGroup max={2} size="sm" textColor="black">
      {revieweeInfo.participants.map(reviewee => (
        <Avatar name={`${reviewee.name}`} />
      ))}
    </AvatarGroup>
    <Text>
      {revieweeInfo.groupName} - ({revieweeInfo.participants.map(p => p.name).join(', ')})
    </Text>
  </_Card>
);

export { GroupRevieweeCard, UserRevieweeCard };
