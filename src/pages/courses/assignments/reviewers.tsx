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
import RevieweeCard from 'components/RevieweeCard';

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
}: {
  reviewers: readonly ReviewerInfo[];
  title?: string;
  fallbackText?: string;
}) {
  return (
    <Flex flex="1" direction="column" overflowY={'auto'}>
      <Heading py="15px" size="md">
        {title}
      </Heading>

      {!reviewers.length && <Text>{fallbackText}</Text>}

      {reviewers.length
        ? reviewers.map(({ reviewer, reviewee }, i) => (
            <Flex key={i} h="70px" fontSize="15px" my="10px">
              <ReviewerCard reviewerInfo={reviewer} w="300px" />
              <ArrowForwardIcon alignSelf={'center'} boxSize={'30px'} mx="18px" />
              {reviewee.__typename === 'UserType' && (
                <RevieweeCard revieweeInfo={reviewee} />
              )}
            </Flex>
          ))
        : null}
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
    <Box flexDir="column" display="flex" alignItems="center">
      <Divider />
      <IconButton
        variant="ghost"
        py="30px"
        disabled={isDisabled}
        my="20px"
        aria-label="arrow right icon"
        onClick={onClick}
        icon={<ChevronRightIcon size="large" />}
      />
      <Divider />
    </Box>
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
        input: {
          assignmentId,
          reviewers: toCommitData.map(x => ({
            revieweeUserId: x.reviewee.id,
            reviewerUserId: x.reviewer.id,
          })),
        },
      },
      onCompleted(response, errors) {
        if (errors?.length) {
          console.log('Error while commiting reviewers', errors);
          toast({ title: 'No pudimos asignar los correctores', status: 'error' });
        } else {
          console.log('Reviewers assigned');
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
      <Box px="10px">
        <Divider />
      </Box>
      <AssignmentsContainer
        title="Pendientes"
        reviewers={previewReviewers}
        fallbackText="No hay alumnos pendientes a los cuales asignar correctores"
      />
      <AssignButton
        onClick={() => {
          onCommit(
            previewReviewers.filter(
              (x): x is UserReviewee => x.reviewee.__typename === 'UserType'
            )
          );
          setIsLoading(true);
        }}
        isDisabled={!previewReviewers.length}
      />
      <AssignmentsContainer
        title="Asignados"
        reviewers={reviewers}
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
  <HStack alignItems={'stretch'} h="700px">
    {children}
  </HStack>
);

const PageContent = () => {
  const { assignmentId, courseId } = useParams();

  if (!assignmentId || !courseId) {
    return null;
  }

  return (
    <PageDataContainer>
      <Heading m="20px 0px">Asignar correctores</Heading>
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
