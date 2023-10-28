import { Dispatch, Suspense, useEffect, useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';
import { cloneDeep, uniq } from 'lodash';

import { Checkbox, Flex, HStack, Skeleton, Stack, Switch } from '@chakra-ui/react';

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
import TeacherPage from 'components/TeacherOnlyPage';

import ReviewerCard from 'components/ReviewerCard';
import { GroupRevieweeCard, UserRevieweeCard } from 'components/RevieweeCard';

import ReviewersAssignmentQueryDef from 'graphql/ReviewersAssignmentQuery';
import CommitReviewersMutationDef from 'graphql/CommitReviewersMutation';
import RemoveReviewersMutationDef from 'graphql/RemoveReviewersMutation';
import type { Mutable } from 'types';

import type { RemoveReviewersMutation } from '__generated__/RemoveReviewersMutation.graphql';
import type {
  ReviewersAssignmentQuery,
  ReviewersAssignmentQuery$data,
} from '__generated__/ReviewersAssignmentQuery.graphql';
import type { CommitReviewersMutation } from '__generated__/CommitReviewersMutation.graphql';
import Spinner from 'components/Spinner';

type Assignment = Mutable<
  NonNullable<
    NonNullable<
      NonNullable<ReviewersAssignmentQuery$data['viewer']>['course']
    >['assignment']
  >
>;

type Teacher = Mutable<
  NonNullable<
    NonNullable<ReviewersAssignmentQuery$data['viewer']>['course']
  >['teachersUserRoles'][number]['user']
>;

type Filters = {
  teacherIds: string[];
  consecutives: boolean;
};

type UserReviewee = Omit<ReviewerInfo, 'reviewee'> & {
  reviewee: Extract<ReviewerInfo['reviewee'], { __typename: 'UserType' }>;
};

type GroupReviewee = Omit<ReviewerInfo, 'reviewee'> & {
  reviewee: Extract<ReviewerInfo['reviewee'], { __typename: 'InternalGroupType' }>;
};

type ReviewerInfo = Assignment['previewReviewers'][number];
type SanitizedReviewer = (Omit<ReviewerInfo, 'reviewee'> & UserReviewee) | GroupReviewee;

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
    if (filters.teacherIds.length === 1 && filters.teacherIds.includes(teacher.id)) {
      return setFilters({ ...filters, teacherIds: [] });
    }

    if (uniq([...filters.teacherIds, teacher.id]).length === teachers.length) {
      return setFilters({ ...filters, teacherIds: [] });
    }

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
              isChecked={
                filters.teacherIds.includes(teacher.id) || filters.teacherIds.length === 0
              }
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
  teachers,
  reviewers,
  title,
  fallbackText,
  groupsParticipants,
  setPreviewReviewers,
  handleRemoveReviewer,
}: {
  teachers: Teacher[];
  reviewers: SanitizedReviewer[];
  title?: string;
  fallbackText?: string;
  groupsParticipants: Assignment['groupParticipants'];
  setPreviewReviewers?: Dispatch<SanitizedReviewer[]>;
  handleRemoveReviewer?: (reviewerId: string, revieweeId: string) => void;
}) {
  const buildRevieweeCard = (
    reviewerId: ReviewerInfo['reviewer']['id'],
    reviewee: ReviewerInfo['reviewee']
  ) => {
    if (reviewee.__typename === 'UserType')
      return (
        <UserRevieweeCard
          revieweeInfo={{ ...reviewee }}
          onRemove={
            handleRemoveReviewer && (() => handleRemoveReviewer(reviewerId, reviewee.id))
          }
        />
      );

    if (reviewee.__typename === 'InternalGroupType') {
      // Reviewee puede ser un grupo entero asi que agarramos sus integrantes.
      const groupParticipants = groupsParticipants
        .filter(gp => gp.groupId === reviewee.id)
        .map(x => x.user);

      return (
        <GroupRevieweeCard
          onRemove={
            handleRemoveReviewer && (() => handleRemoveReviewer(reviewerId, reviewee.id))
          }
          revieweeInfo={{
            groupName: reviewee.groupName || 'Sin nombre',
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
              <ReviewerCard
                availableReviewers={teachers}
                onChangeReviewer={reviewerId => {
                  // Clonamos la lista para hacerla mutable.
                  const reviewersClone = cloneDeep(reviewers);

                  const target = reviewersClone.find(x => x.reviewee.id === reviewee.id);

                  if (!target?.reviewer) {
                    return null;
                  }

                  target.reviewer = teachers.find(x => x.id === reviewerId)!;

                  setPreviewReviewers && setPreviewReviewers(reviewersClone);
                }}
                reviewerInfo={reviewer}
                h="70px"
                w="200px"
              />
              <ArrowForwardIcon alignSelf={'center'} boxSize={'30px'} />
              {buildRevieweeCard(reviewer.id, reviewee)}
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

const sanitizeReviewers = (reviewers: ReviewerInfo[]): SanitizedReviewer[] => {
  return reviewers.filter(
    (x): x is SanitizedReviewer => x.reviewee.__typename !== '%other'
  );
};

function ReviewersPageContainer({
  courseId,
  assignmentId,
}: {
  courseId: string;
  assignmentId: string;
}) {
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [commitMutation] = useMutation<CommitReviewersMutation>(
    CommitReviewersMutationDef
  );

  const [commitRemoveReviewersMutation] = useMutation<RemoveReviewersMutation>(
    RemoveReviewersMutationDef
  );

  const [filters, setFilters] = useState<Filters>({
    consecutives: false,
    teacherIds: [],
  });

  const { viewer } = useLazyLoadQuery<Mutable<ReviewersAssignmentQuery>>(
    ReviewersAssignmentQueryDef,
    {
      courseId,
      assignmentId,
      filters: { consecutive: filters.consecutives, teachersUserIds: filters.teacherIds },
    },
    { fetchPolicy: 'network-only' }
  );

  const [reviewers, setReviewers] = useState<SanitizedReviewer[]>(
    sanitizeReviewers(viewer?.course?.assignment?.reviewers || [])
  );
  const [previewReviewers, setPreviewReviewers] = useState<SanitizedReviewer[]>(
    sanitizeReviewers(viewer?.course?.assignment?.previewReviewers || [])
  );

  const groupsParticipants = viewer?.course?.assignment?.groupParticipants ?? [];

  useEffect(() => {
    if (!viewer?.course?.assignment) {
      return;
    }

    const { previewReviewers, reviewers } = viewer.course.assignment;

    setPreviewReviewers(sanitizeReviewers(previewReviewers));
    setReviewers(sanitizeReviewers(reviewers));
  }, [viewer, courseId, assignmentId]);

  const onCommit = (
    toCommitData: readonly { reviewer: { id: string }; reviewee: { id: string } }[]
  ) => {
    setShowSpinner(true);
    commitMutation({
      variables: {
        courseId,
        // Necesario para poder updatear el cache con los filtros que tenemos
        // actualmente.
        filters: {
          consecutive: filters.consecutives,
          teachersUserIds: filters.teacherIds,
        },
        input: {
          assignmentId,
          reviewers: toCommitData.map(x => ({
            reviewerUserId: x.reviewer.id,
            revieweeId: x.reviewee.id,
          })),
        },
      },
      onCompleted(response, errors) {
        setShowSpinner(false);
        if (errors?.length) {
          console.log('Error while commiting reviewers', errors);
          toast({ title: 'No pudimos asignar los correctores', status: 'error' });
        } else {
          console.log('Reviewers set!');
          setPreviewReviewers(
            response?.assignReviewers?.previewReviewers as SanitizedReviewer[]
          );
          setReviewers(response?.assignReviewers?.reviewers as SanitizedReviewer[]);
          toast({ title: 'Correctores asignados', status: 'success' });
        }
      },
    });
  };

  const handleRemoveReviewer = (reviewerId: string, revieweeId: string) => {
    const t = reviewers.find(
      x => x.reviewer.id === reviewerId && x.reviewee.id === revieweeId
    );

    if (t) {
      setShowSpinner(true);
      commitRemoveReviewersMutation({
        variables: {
          reviewerIds: [t?.id],
          courseId,
          assignmentId,
          // Necesario para poder updatear el cache con los filtros que tenemos
          // actualmente.
          filters: {
            consecutive: filters.consecutives,
            teachersUserIds: filters.teacherIds,
          },
        },
        onCompleted(response, errors) {
          setShowSpinner(false);
          if (errors?.length) {
            if (errors.map(error => error.message.includes('ALREADY_REVIEWED'))) {
              toast({
                title: 'No es posible eliminar',
                description: 'El reviewer ya realizo correcciones.',
                status: 'error',
              });
            } else {
              console.log('Error while commiting reviewers', errors);
              toast({ title: 'No pudimos asignar los correctores', status: 'error' });
            }
          } else {
            console.log('Reviewers set!');
            setPreviewReviewers(
              response?.removeReviewers?.previewReviewers as SanitizedReviewer[]
            );
            setReviewers(response?.removeReviewers?.reviewers as SanitizedReviewer[]);
            toast({ title: 'Correctores asignados', status: 'success' });
          }
        },
      });
    }
  };

  return (
    <>
      <Heading size={'lg'}>
        Asignar correctores - {viewer?.course?.assignment?.title}
      </Heading>
      <ContainerLayout>
        <Spinner
          isOpen={showSpinner}
          onClose={() => {
            setShowSpinner(false);
          }}
        />
        <AssignmentSettings
          teachers={viewer?.course?.teachersUserRoles.map(x => x.user) || []}
          filters={filters}
          setFilters={setFilters}
          editable={!!previewReviewers.length}
        />
        <AssignmentsContainer
          setPreviewReviewers={setPreviewReviewers}
          teachers={viewer?.course?.teachersUserRoles.map(x => x.user) || []}
          title="Pendientes"
          reviewers={previewReviewers}
          fallbackText="No hay alumnos pendientes a los cuales asignar correctores"
          groupsParticipants={groupsParticipants}
        />
        <AssignButton
          onClick={() => {
            onCommit(previewReviewers);
          }}
          isDisabled={!previewReviewers.length}
        />
        <AssignmentsContainer
          teachers={[]}
          title="Asignados"
          reviewers={reviewers}
          groupsParticipants={groupsParticipants}
          fallbackText="Asigna los correctores seleccionando los profesores y clickeando en el boton"
          handleRemoveReviewer={handleRemoveReviewer}
        />
      </ContainerLayout>
    </>
  );
}

function LoadingPageContainer() {
  return (
    <ContainerLayout>
      <Skeleton rounded={'lg'} h="70px" />
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
      <Suspense fallback={<LoadingPageContainer />}>
        <ReviewersPageContainer assignmentId={assignmentId} courseId={courseId} />
      </Suspense>
    </PageDataContainer>
  );
};

const AssignReviewersPage = () => {
  return (
    <Navigation>
      <TeacherPage>
        <PageContent />
      </TeacherPage>
    </Navigation>
  );
};

export default AssignReviewersPage;
