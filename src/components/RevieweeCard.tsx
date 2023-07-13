import Card from 'components/Card';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

type Props = {
  revieweeInfo: { name: string; lastName: string; file: string };
};

const RevieweeCard = ({ revieweeInfo: { name, lastName, file } }: Props) => (
  <Card w="100%" opacity={'80%'}>
    <Avatar name={`${name} ${lastName}`} mx="10px" size="sm" />
    <Text>
      {name} {lastName} - {file}
    </Text>
  </Card>
);

export default RevieweeCard;
