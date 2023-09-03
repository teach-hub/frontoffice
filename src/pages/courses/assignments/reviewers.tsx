import { Suspense, Dispatch, useEffect, useState } from 'react';
import { useMutation, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import { Skeleton, Switch, Stack, Flex, HStack, Checkbox } from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ChevronRightIcon } from '@primer/octicons-react';

import useToast from 'hooks/useToast';

import IconButton from 'components/IconButton';
import Divider from 'components/Divider';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Card from 'components/Card';
import Text from 'components/Text';
import Box from 'components/Box';

import ReviewerCard from 'components/ReviewerCard';
import { UserRevieweeCard, GroupRevieweeCard } from 'components/RevieweeCard';

import ReviewersAssignmentQueryDef from 'graphql/ReviewersAssignmentQuery';
import CommitReviewersMutationDef from 'graphql/CommitReviewersMutation';

import type {
  ReviewersAssignmentQuery,
  ReviewersAssignmentQuery$data,
} from '__generated__/ReviewersAssignmentQuery.graphql';
import type { CommitReviewersMutation } from '__generated__/CommitReviewersMutation.graphql';

type Assignment = NonNullable<
  NonNullable<
    NonNullable<ReviewersAssignmentQuery$data['viewer']>['course']
  >['assignment']
>;

type ReviewerInfo = Assignment['previewReviewers'][number];

type Teacher = NonNullable<
  NonNullable<ReviewersAssignmentQuery$data['viewer']>['course']
>['teachersUserRoles'][number]['user'];

type Filters = {
  teacherIds: string[];
  consecutives: boolean;
};

type UserReviewee = Omit<ReviewerInfo, 'reviewee'> & {
  reviewee: Extract<ReviewerInfo['reviewee'], { __typename: 'UserType' }>;
};

type InternalGroupType = Omit<ReviewerInfo, 'reviewee'> & {
  reviewee: Extract<ReviewerInfo['reviewee'], { __typename: 'InternalGroupType' }>;
};

function AssignmentSettings(
  props:
    | {
        setFilters: Dispatch<Filters>;
        filters: Filters;
        teachers: Teacher[];
        isLoading?: false;
        editable: boolean;
      }
    | {
        isLoading: true;
      }
) {
  if (props.isLoading) {
    return (
      <Card textColor="black" bg="white" minW="300px">
        <Stack h="100%" spacing="50px">
          <Skeleton h="30px" />
          <Skeleton h="30px" />
          <Skeleton h="30px" />
        </Stack>
      </Card>
    );
  }

  const { setFilters, filters, teachers } = props;

  const buildOnTeacherChange = (teacher: Teacher) => () => {
    return setFilters({
      ...filters,

      // Si ya existe en la lista lo saco, sino lo agrego.

      teacherIds: filters.teacherIds.includes(teacher.id)
        ? filters.teacherIds.filter(id => id !== teacher.id)
        : [...filters.teacherIds, teacher.id],
    });
  };

  return (
    <Card textColor="black" bg="white" minW="300px">
      <Stack h="100%" spacing="50px">
        <Heading size={'md'}>Configuracion</Heading>

        <Stack spacing="20px">
          <Text>Estrategia</Text>
          <Flex gap={'10px'}>
            <Switch
              disabled={!props.editable}
              isChecked={filters.consecutives}
              onChange={() =>
                setFilters &&
                setFilters({ ...filters, consecutives: !filters.consecutives })
              }
            />
            <Text>Consecutivos</Text>
          </Flex>

          <Text>Profesores</Text>
          {teachers.map((teacher, k) => (
            <Checkbox
              key={k}
              disabled={!props.editable}
              isChecked={filters.teacherIds.includes(teacher.id)}
              onChange={buildOnTeacherChange(teacher)}
            >
              {teacher.name} {teacher.lastName}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

function AssignmentsContainer({
  reviewers,
  title,
  fallbackText,
  groupsParticipants,
}: {
  reviewers: readonly ReviewerInfo[];
  title?: string;
  fallbackText?: string;
  groupsParticipants: Assignment['groupParticipants'];
}) {
  const buildRevieweeCard = (reviewee: ReviewerInfo['reviewee']) => {
    if (reviewee.__typename === 'UserType')
      return <UserRevieweeCard revieweeInfo={{ ...reviewee }} />;

    if (reviewee.__typename === 'InternalGroupType') {
      // Reviewee puede ser un grupo entero asi que agarramos sus integrates.
      const groupParticipants = groupsParticipants
        .filter(x => x.groupId === reviewee.id)
        .map(x => x.user);

      return (
        <GroupRevieweeCard
          revieweeInfo={{
            groupName: reviewee.groupName!,
            participants: groupParticipants,
          }}
        />
      );
    }

    return null;
  };

  return (
    <Flex flex="1" direction="column" gap="20px">
      <Heading size="md">{title}</Heading>
      <Flex h="100%" gap="15px" direction="column" overflowY={'auto'}>
        {reviewers.length ? (
          reviewers.map(({ reviewer, reviewee }, i) => (
            <Box display="flex" gap="25px" key={i} h="70px" fontSize="15px">
              <ReviewerCard reviewerInfo={reviewer} w="300px" />
              <ArrowForwardIcon alignSelf={'center'} boxSize={'30px'} />
              {buildRevieweeCard(reviewee)}
            </Box>
          ))
        ) : (
          <Text>{fallbackText}</Text>
        )}
      </Flex>
    </Flex>
  );
}

function AssignButton({
  onClick,
  isDisabled,
}: {
  onClick?: () => void;
  isDisabled: boolean;
}) {
  return (
    <Flex gap="20px" direction={'column'} alignItems="center">
      <Divider />
      <IconButton
        variant="ghost"
        disabled={isDisabled}
        aria-label="assign reviewers icon"
        onClick={onClick}
        icon={<ChevronRightIcon size="large" />}
      />
      <Divider />
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
  const toast = useToast();

  const [commitMutation] = useMutation<CommitReviewersMutation>(
    CommitReviewersMutationDef
  );

  const [filters, setFilters] = useState<Filters>({
    consecutives: false,
    teacherIds: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { viewer } = useLazyLoadQuery<ReviewersAssignmentQuery>(
    ReviewersAssignmentQueryDef,
    {
      courseId,
      assignmentId,
      filters: { consecutive: filters.consecutives, teachersUserIds: filters.teacherIds },
    }
  );

  const [reviewers, setReviewers] = useState<readonly ReviewerInfo[]>(
    viewer?.course?.assignment?.reviewers || []
  );
  const [previewReviewers, setPreviewReviewers] = useState<readonly ReviewerInfo[]>(
    viewer?.course?.assignment?.previewReviewers || []
  );

  const groupsParticipants = viewer?.course?.assignment?.groupParticipants ?? [];

  useEffect(() => {
    if (!viewer?.course?.assignment) {
      return;
    }

    const { previewReviewers, reviewers } = viewer.course.assignment;

    setPreviewReviewers(previewReviewers);
    setReviewers(reviewers);
  }, [viewer]);

  const onCommit = (
    toCommitData: readonly { reviewer: { id: string }; reviewee: { id: string } }[]
  ) => {
    commitMutation({
      variables: {
        courseId,
        input: {
          assignmentId,
          reviewers: toCommitData.map(x => ({
            reviewerUserId: x.reviewer.id,
            revieweeId: x.reviewee.id,
          })),
        },
      },
      onCompleted(response, errors) {
        if (errors?.length) {
          console.log('Error while commiting reviewers', errors);
          toast({ title: 'No pudimos asignar los correctores', status: 'error' });
        } else {
          setReviewers(response.assignReviewers);
          setPreviewReviewers([]);
          toast({ title: 'Correctores asignados', status: 'success' });
        }
        setIsLoading(false);
      },
    });
  };

  if (isLoading) {
    return <LoadingPageContainer />;
  }

  return (
    <ContainerLayout>
      <AssignmentSettings
        teachers={viewer?.course?.teachersUserRoles.map(x => x.user) || []}
        filters={{ ...filters, teacherIds: previewReviewers.map(x => x.reviewer.id) }}
        setFilters={setFilters}
        editable={!!previewReviewers.length}
      />
      <AssignmentsContainer
        title="Pendientes"
        reviewers={previewReviewers}
        fallbackText="No hay alumnos pendientes a los cuales asignar correctores"
        groupsParticipants={groupsParticipants}
      />
      <AssignButton
        onClick={() => {
          onCommit(
            previewReviewers.filter((x): x is UserReviewee | InternalGroupType =>
              ['UserType', 'InternalGroupType'].includes(x.reviewee.__typename)
            )
          );
          setIsLoading(true);
        }}
        isDisabled={!previewReviewers.length}
      />
      <AssignmentsContainer
        title="Asignados"
        reviewers={reviewers}
        groupsParticipants={groupsParticipants}
        fallbackText="Asigna los correctores seleccionando los profesores y clickeando en el boton"
      />
    </ContainerLayout>
  );
}

function LoadingPageContainer() {
  return (
    <ContainerLayout>
      <AssignmentSettings isLoading />
      <Stack spacing="10px " w="100%">
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
      </Stack>
      <AssignButton isDisabled />
      <Stack spacing="10px" w="100%">
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
        <Skeleton rounded={'lg'} h="70px" />
      </Stack>
    </ContainerLayout>
  );
}

const ContainerLayout = ({ children }: { children: JSX.Element[] }) => (
  <HStack gap="30px" alignItems={'stretch'} h="700px">
    {children}
  </HStack>
);

const PageContent = () => {
  const { assignmentId, courseId } = useParams();

  if (!assignmentId || !courseId) {
    return null;
  }

  return (
    <PageDataContainer gap="30px">
      <Heading>Asignar correctores</Heading>
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
