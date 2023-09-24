import { AvatarGroup } from '@chakra-ui/react';

import Box from 'components/Box';
import Card from 'components/Card';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import CrossIcon from 'icons/CrossIcon';

type UserRevieweeCardProps = {
  readonly revieweeInfo: { name: string; lastName: string; file: string };
  onRemove?: () => void;
};

type GroupRevieweeCardProps = {
  readonly revieweeInfo: {
    groupName: string;
    participants: { name: string; lastName: string }[];
  };
  onRemove?: () => void;
};

const InnerCard = ({
  children,
  onRemove,
}: {
  children: JSX.Element | (JSX.Element | undefined)[];
  onRemove?: () => void;
}) => {
  return (
    <Card bodyProps={{ justifyContent: 'space-between' }} w="100%" opacity={'80%'}>
      <Box gap="10px" alignItems="center" display="flex">
        {children}
      </Box>
      {onRemove && (
        <Box onClick={() => onRemove()}>
          <CrossIcon />
        </Box>
      )}
    </Card>
  );
};

const UserRevieweeCard = ({
  revieweeInfo: { name, lastName, file },
  onRemove,
}: UserRevieweeCardProps) => (
  <InnerCard onRemove={onRemove}>
    <Avatar name={`${name} ${lastName}`} />
    <Text>
      {name} {lastName} - {file}
    </Text>
  </InnerCard>
);

const GroupRevieweeCard = ({ revieweeInfo, onRemove }: GroupRevieweeCardProps) => {
  const text = `${revieweeInfo.groupName}`;
  const members = revieweeInfo.participants
    .map(reviewee => `${reviewee.name} ${reviewee.lastName}`)
    .join(', ');

  return (
    <InnerCard onRemove={onRemove}>
      <Tooltip label={members}>
        <AvatarGroup max={2} size="sm" textColor="black">
          {revieweeInfo.participants.map((reviewee, i) => (
            <Avatar key={i} name={`${reviewee.name}`} />
          ))}
        </AvatarGroup>
      </Tooltip>
      <Text>{text.length > 20 ? `${text.substring(0, 20)}...` : text}</Text>
    </InnerCard>
  );
};

export { GroupRevieweeCard, UserRevieweeCard };
