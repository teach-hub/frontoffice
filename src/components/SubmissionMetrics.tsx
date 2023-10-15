import { Stack } from '@chakra-ui/react';
import { useFragment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { Pie } from 'react-chartjs-2';

import { formatAsSimpleDate } from 'utils/dates';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';

import Heading from 'components/Heading';
import Text from 'components/Text';
import Link from 'components/Link';

import { ExternalLinkIcon } from '@chakra-ui/icons';

import type { SubmissionMetrics_query$key } from '__generated__/SubmissionMetrics_query.graphql';

type Props = {
  queryRef: SubmissionMetrics_query$key;
  pullRequestUrl: string;
};

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
    <Stack maxW="50%" gap={'20px'}>
      <Heading size={'md'}>Métricas de trabajo</Heading>
      <Text>
        Primer commit hecho el:{' '}
        {metrics?.firstCommitDate ? formatAsSimpleDate(metrics.firstCommitDate) : '-'}
      </Text>
      <Text>
        Ultimo commit hecho el:{' '}
        {metrics?.lastCommitDate ? formatAsSimpleDate(metrics.lastCommitDate) : '-'}
      </Text>
      <Pie
        data={{
          labels: metrics?.contributions.map(
            contribution => `${contribution.user.name} ${contribution.user.lastName}`
          ),
          datasets: [
            {
              label: 'Commits',
              data: metrics?.contributions.map(contribution => contribution.commitsMade),
              backgroundColor: metrics?.contributions.map(
                contribution =>
                  `#${Math.floor(
                    ((contribution.user.name.length + contribution.user.lastName.length) /
                      100) *
                      16777215
                  ).toString(16)}`
              ),
              hoverOffset: 10,
            },
          ],
        }}
      />
      <Link
        isExternal
        href={`${getGithubRepoUrlFromPullRequestUrl(
          props.pullRequestUrl
        )}/graphs/contributors`}
      >
        Podés ver otras métricas acá <ExternalLinkIcon />{' '}
      </Link>
    </Stack>
  );
}

export default SubmissionMetrics;
