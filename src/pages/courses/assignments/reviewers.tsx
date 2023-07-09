import { Suspense, useState } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';

import {
  Skeleton,
  Switch,
  Stack,
  Badge,
  Flex,
  HStack,
  CheckboxGroup,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

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

import type {
  reviewersQuery,
  reviewersQuery$data,
} from '__generated__/reviewersQuery.graphql';
import type { CommitReviewersMutation } from '__generated__/CommitReviewersMutation.graphql';

type ReviewerInfo = NonNullable<
  NonNullable<NonNullable<reviewersQuery$data['viewer']>['course']>['assignment']
>['previewReviewers'][number];

function AssignmentSettings({
  editable,
  setPreview,
  preview,
  onFiltersChange,
  filters,
}: {
  editable: boolean;
  // eslint-disable-next-line
  onFiltersChange: any;
  // eslint-disable-next-line
  filters: any;
  // eslint-disable-next-line
  setPreview: any;
  preview: boolean;
}) {
  return (
    <Card opacity="90%" textColor="black" bg="white" variant="elevated" w="600px">
      <Stack w="100%" h="100%" spacing="50px">
        <Flex justifyContent="space-between" dir="row">
          <Text fontSize={'25'}>Configuracion</Text>

          <Flex alignItems="center">
            <Switch
              isDisabled={!editable}
              size="md"
              isChecked={preview}
              onChange={() => setPreview(!preview)}
            />
            <Text paddingLeft="10px">Previsualizacion</Text>
          </Flex>
        </Flex>

        <Stack>
          <Text>Estrategia</Text>
          <Flex alignItems="center">
            <Switch
              isDisabled={!editable}
              isChecked={filters.consecutives}
              onChange={onFiltersChange}
            />
            <Text paddingLeft="10px">Consecutivos</Text>
          </Flex>
        </Stack>
      </Stack>
    </Card>
  );
}

function ReviewerAssignment({
  reviewerInfo: { reviewer, reviewee },
}: {
  reviewerInfo: ReviewerInfo;
}) {
  return (
    <Flex direction={'row'} alignItems={'center'} margin="20px 0" marginBlockStart="0px">
      <HStack
        borderWidth="1px"
        borderColor="grey"
        borderRadius="10px"
        justifyContent="center"
        h="70px"
        w="20%"
      >
        <Avatar name={`${reviewer.name} ${reviewer.lastName}`} size="md" />
        <Text w="50%" fontSize="17px">
          {reviewer.name} {reviewer.lastName}
        </Text>
      </HStack>
      <ArrowForwardIcon color="black" boxSize={'30px'} margin="0px 18px" />
      <Card flex="1" opacity={'80%'} alignContent="space-around">
        <HStack flex="1">
          <Avatar
            name={`${reviewee.name} ${reviewee.lastName}`}
            margin="0px 10px"
            size="sm"
          />
          <Text>
            {reviewee.name} {reviewee.lastName}
          </Text>
          <Text>-</Text>
          <Text>{reviewee.file}</Text>
        </HStack>
        <Badge borderRadius="5px">Test</Badge>
      </Card>
    </Flex>
  );
}

function AssignPreview({ reviewers }: { reviewers: readonly ReviewerInfo[] }) {
  return (
    <Flex h="90%" direction="column" overflowY={'auto'}>
      {reviewers.map((r, i) => (
        <ReviewerAssignment key={i} reviewerInfo={r} />
      ))}
    </Flex>
  );
}

function ReviewersPageContainer({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) {
  const [commitMutation] = useMutation<CommitReviewersMutation>(
    CommitReviewersMutationDef
  );

  const [filters, setFilters] = useState({ consecutives: false });
  const [preview, setPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
                  file
                }
              }
              previewReviewers(consecutive: $consecutive) {
                id
                reviewee {
                  id
                  name
                  lastName
                  file
                }
                reviewer {
                  id
                  name
                  lastName
                }
              }
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

  const [reviewers, setReviewers] = useState(viewer?.course?.assignment?.reviewers || []);

  if (!viewer?.course?.assignment) {
    return null;
  }

  const { assignment } = viewer.course;

  const onCommitPreview = (
    toCommitData: { reviewerId: string; revieweeId: string }[]
  ) => {
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
      onCompleted(response, errors) {
        setReviewers(response.assignReviewers);
        setIsLoading(false);
      },
    });
  };

  const onFiltersChange = () => {
    setFilters({ consecutives: !filters.consecutives });
    setReviewers(assignment?.previewReviewers || []);
  };

  if (isLoading) {
    return (
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
          editable={false}
          preview={preview}
          filters={filters}
          setPreview={setPreview}
          onFiltersChange={onFiltersChange}
        />
        <Stack w="100%">
          <Skeleton h="30px" />
          <Skeleton h="30px" />
          <Skeleton h="30px" />
        </Stack>
      </HStack>
    );
  }

  // Si hay previewers lockeamos todo y los mostramos.
  if (assignment.reviewers.length) {
    return (
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
          editable={false}
          preview={preview}
          filters={filters}
          setPreview={setPreview}
          onFiltersChange={onFiltersChange}
        />
        <Stack w="100%">
          <AssignPreview reviewers={reviewers} />
        </Stack>
      </HStack>
    );
  }

  return (
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
        editable
        preview={preview}
        filters={filters}
        setPreview={setPreview}
        onFiltersChange={onFiltersChange}
      />
      <Stack w="100%">
        {!preview ? (
          <Box h="100%">No hay reviewers asignados.</Box>
        ) : (
          <AssignPreview reviewers={assignment.previewReviewers} />
        )}
        <Box textAlign="right">
          <Button size="sm">Cancelar</Button>
          <Button
            onClick={() => {
              onCommitPreview(
                assignment.previewReviewers.map(r => ({
                  revieweeId: r.reviewee.id,
                  reviewerId: r.reviewer.id,
                }))
              );
              setIsLoading(true);
            }}
            size="sm"
          >
            Guardar
          </Button>
        </Box>
      </Stack>
    </HStack>
  );
}

function LoadingPageContainer() {
  return (
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
        editable={false}
        preview={false}
        filters={[]}
        setPreview={() => null}
        onFiltersChange={() => null}
      />
      <Stack w="100%">
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
      </Stack>
    </HStack>
  );
}

const PageContent = () => {
  const { assignmentId, courseId } = useParams();

  if (!assignmentId || !courseId) {
    return null;
  }

  return (
    <PageDataContainer>
      <Heading margin="20px 0px">Asignar correctores</Heading>
      <Suspense fallback={<LoadingPageContainer />}>
        <ReviewersPageContainer assignmentId={assignmentId} courseId={courseId} />
      </Suspense>
    </PageDataContainer>
  );
};

const AssignReviewersPage = () => {
  return (
    <Navigation>
      <PageContent />
    </Navigation>
  );
};

export default AssignReviewersPage;
