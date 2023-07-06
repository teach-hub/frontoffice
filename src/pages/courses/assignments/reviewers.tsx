import { Suspense, useState } from 'react';
import { useMutation, useLazyLoadQuery, useFragment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';

import { Switch, Stack, Badge, Flex, HStack, CheckboxGroup } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { Checkbox } from 'components/Checkbox';
import Divider from 'components/Divider';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Card from 'components/Card';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import Box from 'components/Box';
import Button from 'components/Button';

import CommitReviewersMutationDef from 'graphql/CommitReviewersMutation';

import type { reviewersQuery } from '__generated__/reviewersQuery.graphql';
import type {
  reviewersPreview$key,
  reviewersPreview$data,
} from '__generated__/reviewersPreview.graphql';
import type { CommitReviewersMutation } from '__generated__/CommitReviewersMutation.graphql';

type ReviewerInfo = reviewersPreview$data['previewReviewers'][number];

const AssignmentSettings = ({
  onAssign,
  onFiltersChange,
  filters,
}: {
  // eslint-disable-next-line
  onAssign: any;
  // eslint-disable-next-line
  onFiltersChange: any;
  // eslint-disable-next-line
  filters: any;
}) => {
  return (
    <Card opacity="90%" textColor="black" bg="white" variant="elevated" w="500px">
      <Stack h="100%" flex="1" alignSelf="flex-start">
        <Text fontSize={'20'}>Configuracion</Text>
        <Stack>
          <Text>Estrategia</Text>
          <Switch isChecked={filters.consecutives} onChange={onFiltersChange}>
            Consecutivos
          </Switch>
        </Stack>
      </Stack>
    </Card>
  );
};

const ReviewerAssignment = ({
  reviewerInfo: { reviewer, reviewee },
}: {
  reviewerInfo: ReviewerInfo;
}) => {
  return (
    <Flex direction={'row'} alignItems={'center'} margin="20px 0" marginBlockStart="0px">
      <HStack
        borderWidth="1px"
        borderColor="grey"
        borderRadius="10px"
        justifyContent="center"
        h="70px"
        w="15%"
      >
        <Avatar size="md" />
        <Text w="50%" fontSize="17px">
          {reviewer.name} {reviewer.lastName}
        </Text>
      </HStack>
      <ArrowForwardIcon color="black" boxSize={'30px'} margin="0px 18px" />
      <Card flex="1" opacity={'80%'} alignContent="space-around">
        <HStack flex="1">
          <Avatar margin="0px 10px" size="sm" />
          <Text>
            {reviewee.name} {reviewee.lastName}
          </Text>
          <Text>-</Text>
          <Text>99840</Text>
        </HStack>
        <Badge borderRadius="5px">Test</Badge>
      </Card>
    </Flex>
  );
};

const AssignPreview = ({
  assignmentRef,
  onCommitPreview,
}: {
  assignmentRef: reviewersPreview$key;
  onCommitPreview: (_: { reviewerId: string; revieweeId: string }[]) => void;
}) => {
  const { previewReviewers } = useFragment(
    graphql`
      fragment reviewersPreview on AssignmentType {
        previewReviewers(consecutive: $consecutive) {
          id
          reviewee {
            id
            name
            lastName
          }
          reviewer {
            id
            name
            lastName
          }
        }
      }
    `,
    assignmentRef
  );

  console.log(
    'previewData',
    previewReviewers.map(x => x.reviewer.name)
  );

  return (
    <Flex h="90%" direction="column" overflowY={'auto'}>
      {previewReviewers.map((reviewer, i) => {
        return <ReviewerAssignment key={i} reviewerInfo={reviewer} />;
      })}
    </Flex>
  );
};

const ReviewersPage = ({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) => {
  const [commitMutation] = useMutation<CommitReviewersMutation>(
    CommitReviewersMutationDef
  );

  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState({ consecutives: false });

  const { viewer } = useLazyLoadQuery<reviewersQuery>(
    graphql`
      query reviewersQuery($courseId: ID!, $assignmentId: ID!, $consecutive: Boolean!) {
        viewer {
          id
          course(id: $courseId) {
            id
            assignment(id: $assignmentId) {
              id
              reviewers {
                id
                reviewer {
                  id
                  name
                  lastName
                }
                reviewee {
                  id
                  name
                  lastName
                }
              }
              ...reviewersPreview
            }
          }
        }
      }
    `,
    {
      courseId,
      assignmentId,
      consecutive: filters.consecutives,
    }
  );

  console.log(
    'Fetched w',
    JSON.stringify({ courseId, assignmentId, filters: filters.consecutives })
  );

  const [reviewers, setReviewers] = useState(viewer?.course?.assignment?.reviewers || []);

  if (!viewer?.course?.assignment) {
    return null;
  }

  const { assignment } = viewer.course;

  const onCommitPreview = (toCommitData: { reviewerId: string; revieweeId: string }[]) =>
    commitMutation({
      variables: {
        input: {
          assignmentId,
          reviewers: toCommitData.map(x => ({
            revieweeUserId: x.revieweeId,
            reviewerUserId: x.reviewerId,
          })),
        },
      },
    });

  const onFiltersChange = () => setFilters({ consecutives: !filters.consecutives });

  return (
    <PageDataContainer>
      <Heading margin="20px 0px">Asignar correctores</Heading>
      <HStack
        alignItems={'stretch'}
        h="800px"
        divider={
          <Box h="90%">
            <Divider margin="0px 10px" />
          </Box>
        }
      >
        <AssignmentSettings
          onAssign={() => setShowPreview(true)}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
        <Stack w="100%">
          <AssignPreview onCommitPreview={onCommitPreview} assignmentRef={assignment} />
          <Box textAlign="right">
            <Button size="sm">Cancelar</Button>
            <Button size="sm">Guardar</Button>
          </Box>
        </Stack>
      </HStack>
    </PageDataContainer>
  );
};

const PageContent = () => {
  const { assignmentId, courseId } = useParams();

  if (!assignmentId || !courseId) {
    return null;
  }

  return <ReviewersPage assignmentId={assignmentId} courseId={courseId} />;
};

const AssignReviewersPage = () => {
  return (
    <Navigation>
      <Suspense>
        <PageContent />
      </Suspense>
    </Navigation>
  );
};

export default AssignReviewersPage;
