import { Flex, Stack } from '@chakra-ui/react';
import { useFragment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { formatAsSimpleDate } from 'utils/dates';

import Heading from 'components/Heading';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

import type {
  SubmissionMetrics_query$key,
  SubmissionMetrics_query$data,
} from '__generated__/SubmissionMetrics_query.graphql';

type Contribution = NonNullable<
  SubmissionMetrics_query$data['metrics']
>['contributions'][number];

const CommitCount = ({ contribution }: { contribution: Contribution }) => {
  return (
    <Flex gap="5px" p="20px" alignItems={'center'} direction={'column'}>
      <Avatar
        name={`${contribution.user.name} ${contribution.user.lastName}`}
        size="lg"
      />
      <Text fontSize={'xl'}>{contribution.commitsMade} commits</Text>
    </Flex>
  );
};

type Props = { queryRef: SubmissionMetrics_query$key };

function SubmissionMetrics(props: Props) {
  const { metrics } = useFragment(
    graphql`
      fragment SubmissionMetrics_query on SubmissionType {
        metrics {
          firstCommitDate
          lastCommitDate
          contributions {
            id
            user {
              id
              name
              lastName
              file
            }
            commitsMade
          }
        }
      }
    `,
    props.queryRef
  );

  return (
    <Stack maxW="50%" flex="1" gap={'20px'}>
      <Heading size={'md'}>Métricas</Heading>
      <Text>
        Primer commit hecho el:{' '}
        {metrics?.firstCommitDate ? formatAsSimpleDate(metrics.firstCommitDate) : '-'}
      </Text>
      <Text>
        Ultimo commit hecho el:{' '}
        {metrics?.lastCommitDate ? formatAsSimpleDate(metrics.lastCommitDate) : '-'}
      </Text>
      <Flex wrap="wrap" alignItems="center" justifyContent={'space-evenly'}>
        {metrics?.contributions?.map(contribution => (
          <CommitCount contribution={contribution} />
        ))}
      </Flex>
      <Text>Mas informacion en </Text>
    </Stack>
  );
}

export default SubmissionMetrics;
