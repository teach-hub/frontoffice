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
import Avatar from 'components/Avatar';
import Box from 'components/Box';

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

function ContainerLayout({ children }: { children: JSX.Element[] }) {
  return (
    <HStack alignItems={'stretch'} h="700px">
      {children}
    </HStack>
  );
}

function AssignmentSettings({
  teachers,
  onFiltersChange,
  filters,
}: {
  onFiltersChange: Dispatch<Filters>;
  filters: Filters;
  teachers: Teacher[];
}) {
  return (
    <Card opacity="90%" textColor="black" bg="white" variant="elevated" minW="300px">
      <Stack w="100%" h="100%" spacing="50px">
        <Text fontSize={'25'}>Configuracion</Text>

        <Stack spacing="20px">
          <Text>Estrategia</Text>
          <Flex alignItems="center">
            <Switch
              isChecked={filters.consecutives}
              onChange={() =>
                onFiltersChange({ ...filters, consecutives: !filters.consecutives })
              }
            />
            <Text pl="10px">Consecutivos</Text>
          </Flex>
          <Text>Profesores</Text>
          {teachers.map((teacher, k) => (
            <Checkbox
              key={k}
              onChange={() =>
                onFiltersChange({
                  ...filters,
                  teacherIds: filters.teacherIds.includes(teacher.id)
                    ? filters.teacherIds.filter(id => id !== teacher.id)
                    : [...filters.teacherIds, teacher.id],
                })
              }
            >
              {teacher.name} {teacher.lastName}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

function ReviewerCard({ name, lastName }: { name: string; lastName: string }) {
  return (
    <HStack
      borderWidth="1px"
      borderColor="grey"
      borderRadius="10px"
      justifyContent="center"
      w="300px"
    >
      <Avatar name={`${name} ${lastName}`} size="md" />
      <Text maxW="50%">
        {name} {lastName}
      </Text>
    </HStack>
  );
}

function RevieweeCard({
  name,
  lastName,
  file,
}: {
  name: string;
  lastName: string;
  file: string;
}) {
  return (
    <Card w="100%" opacity={'80%'}>
      <Avatar name={`${name} ${lastName}`} mx="10px" size="sm" />
      <Text>
        {name} {lastName} - {file}
      </Text>
    </Card>
  );
}

function AssignPreview({
  reviewers,
  title = 'Pendientes',
}: {
  reviewers: readonly ReviewerInfo[];
  title?: string;
}) {
  return (
    <Flex flex="1" direction="column" overflowY={'auto'}>
      <Text>{title}</Text>
      {reviewers.map(({ reviewer, reviewee }, i) => (
        <Flex key={i} h="70px" fontSize="15px" alignItems="stretch" my="10px">
          <ReviewerCard name={reviewer.name} lastName={reviewer.lastName} />
          <Box display="flex" alignItems="center">
            <ArrowForwardIcon color="black" boxSize={'30px'} mx="18px" />
          </Box>
          <RevieweeCard
            name={reviewee.name}
            lastName={reviewee.lastName}
            file={reviewee.file}
          />
        </Flex>
      ))}
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
    return (
      <ContainerLayout>
        <AssignmentSettings
          teachers={[]}
          filters={filters}
          onFiltersChange={() => null}
        />
        <Stack w="100%">
          <Skeleton h="30px" />
          <Skeleton h="30px" />
          <Skeleton h="30px" />
        </Stack>
      </ContainerLayout>
    );
  }

  // Si hay previewers lockeamos todo y los mostramos.
  return (
    <ContainerLayout>
      <AssignmentSettings
        teachers={viewer?.course?.teachersUserRoles.map(x => x.user) || []}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <Box px="10px">
        <Divider />
      </Box>

      <AssignPreview title="Pendientes" reviewers={previewReviewers} />
      <AssignButton
        onClick={() => {
          onCommit(previewReviewers);
          setIsLoading(true);
        }}
        isDisabled={!previewReviewers.length}
      />

      <AssignPreview title="Asignados" reviewers={reviewers} />
    </ContainerLayout>
  );
}

function LoadingPageContainer() {
  return (
    <ContainerLayout>
      <AssignmentSettings
        teachers={[]}
        filters={{ consecutives: false, teacherIds: [] }}
        onFiltersChange={() => null}
      />
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
