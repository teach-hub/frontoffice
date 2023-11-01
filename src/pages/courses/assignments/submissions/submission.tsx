import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { PayloadError } from 'relay-runtime';

import {
  CheckCircleFillIcon,
  InfoIcon,
  IterationsIcon,
  MortarBoardIcon,
  NumberIcon,
  PencilIcon,
  PeopleIcon,
  PersonFillIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';

import { Flex, Grid, GridItem, Stack, useDisclosure } from '@chakra-ui/react';

import { formatAsSimpleDateTime } from 'utils/dates';
import { getValueOfNextIndex, getValueOfPreviousIndex } from 'utils/list';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';

import { buildAssignmentRoute, buildSubmissionRoute } from 'routes';

import useToast from 'hooks/useToast';
import { FetchedContext, Permission, useUserContext } from 'hooks/useUserCourseContext';
import { useSubmissionContext } from 'hooks/useSubmissionsContext';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import { TextListItem } from 'components/list/TextListItem';
import Link from 'components/Link';
import IconButton from 'components/IconButton';
import Tooltip from 'components/Tooltip';
import Text from 'components/Text';
import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import { Modal } from 'components/Modal';
import { ReviewStatusBadge } from 'components/review/ReviewStatusBadge';
import { ReviewGradeBadge } from 'components/review/ReviewGradeBadge';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import SubmissionStates from 'components/SubmissionStates';
import ReviewModal from 'components/SetReviewModal';
import MarkdownText from 'components/MarkdownText';
import RRLink from 'components/RRLink';
import Spinner from 'components/Spinner';
import Divider from 'components/Divider';
import SubmissionMetrics from 'components/SubmissionMetrics';

import SubmissionQueryDef from 'graphql/SubmissionQuery';
import SubmitSubmissionMutation from 'graphql/SubmitSubmissionAgainMutation';
import CreateReviewMutation from 'graphql/CreateReviewMutation';
import UpdateReviewMutation from 'graphql/UpdateReviewMutation';

import {
  getGradeConfiguration,
  getSubmissionReviewStatusConfiguration,
} from 'app/submissions';

import RepositoryIcon from 'icons/RepositoryIcon';
import PullRequestIcon from 'icons/PullRequestIcon';
import BackArrowIcon from 'icons/BackArrowIcon';
import NextArrowIcon from 'icons/NextArrowIcon';
import CommentIcon from 'icons/CommentIcon';

import type { CreateReviewMutation as CreateReviewMutationType } from '__generated__/CreateReviewMutation.graphql';
import type { UpdateReviewMutation as UpdateReviewMutationType } from '__generated__/UpdateReviewMutation.graphql';
import type { SubmitSubmissionAgainMutation as SubmitSubmissionMutationType } from '__generated__/SubmitSubmissionAgainMutation.graphql';
import type {
  SubmissionQuery,
  SubmissionQuery$data,
} from '__generated__/SubmissionQuery.graphql';

import type { Nullable } from 'types';

type CommentType = NonNullable<
  NonNullable<
    NonNullable<NonNullable<SubmissionQuery$data['viewer']>['course']>['submission']
  >['comments'][number]
>;

const CarrouselNavigationControls = ({
  courseId,
  submissionId,
}: {
  courseId: string;
  submissionId: string;
}) => {
  const { submissionIds } = useSubmissionContext();

  const previousSubmissionId = getValueOfPreviousIndex(submissionIds, submissionId);
  const nextSubmissionId = getValueOfNextIndex(submissionIds, submissionId);

  const previousSubmissionUrl =
    previousSubmissionId && buildSubmissionRoute(courseId, previousSubmissionId);
  const nextSubmissionUrl =
    nextSubmissionId && buildSubmissionRoute(courseId, nextSubmissionId);

  return (
    <Stack direction={'row'} gap={'5px'}>
      {previousSubmissionUrl && (
        <Tooltip label={'Ver entrega anterior'}>
          <RRLink to={previousSubmissionUrl}>
            <IconButton
              variant={'ghost'}
              aria-label="previous-submission"
              icon={<BackArrowIcon />}
            />
          </RRLink>
        </Tooltip>
      )}
      {nextSubmissionUrl && (
        <Tooltip label={'Ver siguiente entrega'}>
          <RRLink to={nextSubmissionUrl}>
            <IconButton
              variant={'ghost'}
              aria-label="next-submission"
              icon={<NextArrowIcon />}
            />
          </RRLink>
        </Tooltip>
      )}
    </Stack>
  );
};

const SubmissionPage = ({
  context,
  submissionId,
}: {
  context: FetchedContext;
  submissionId: string;
}) => {
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const data = useLazyLoadQuery<SubmissionQuery>(SubmissionQueryDef, {
    courseId: context.courseId,
    submissionId,
  });

  const [commitCreateMutation] =
    useMutation<CreateReviewMutationType>(CreateReviewMutation);
  const [commitUpdateMutation] =
    useMutation<UpdateReviewMutationType>(UpdateReviewMutation);
  const [commitSubmitMutation] = useMutation<SubmitSubmissionMutationType>(
    SubmitSubmissionMutation
  );

  const {
    isOpen: isOpenReviewModal,
    onOpen: onOpenReviewModal,
    onClose: onCloseReviewModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCommentsModal,
    onOpen: onOpenCommentsModal,
    onClose: onCloseCommentsModal,
  } = useDisclosure();

  if (!data.viewer || !data.viewer.course) {
    return null;
  }

  const { course } = data.viewer;
  const { submission } = course;

  if (!course || !submission) {
    return null;
  }

  const { assignment, submitter, reviewer, review, comments } = submission;

  if (!assignment) {
    return null;
  }

  const { isGroup, groupParticipants } = assignment;

  if (!submission || !assignment || !submitter) {
    return null; // todo: fix cases when null data
  }

  const LIST_ITEM_ICON_COLOR = 'teachHub.primary';

  const submittedOnTime = assignment.endDate
    ? new Date(submission.submittedAt) <= new Date(assignment.endDate)
    : true;

  const reviewStatusConfiguration = getSubmissionReviewStatusConfiguration({
    review,
    submission,
  });
  const gradeConfiguration = getGradeConfiguration(review?.grade);

  const reviewEnabled =
    submission?.viewerIsReviewer &&
    (!review || (review.revisionRequested && submission.submittedAgainAt));
  const viewerCanSubmitAgain =
    review?.revisionRequested && !review?.reviewedAgainAt && !submission.submittedAgainAt;

  const showWarningToastIfNotReviewer = () => {
    if (!submission?.viewerIsReviewer) {
      toast({
        title: 'No es posible calificar',
        description: 'Para calificar debes ser el corrector de la entrega',
        status: 'warning',
      });
    }
  };

  const handleSubmitButtonClick = () => {
    setShowSpinner(true);
    commitSubmitMutation({
      variables: {
        courseId: course.id,
        submissionId: submission.id,
      },
      onCompleted: (_: unknown, errors: Nullable<PayloadError[]>) => {
        setShowSpinner(false);
        if (errors?.length) {
          toast({
            title: 'Error al re-entregar, intentelo de nuevo',
            status: 'error',
          });
        } else {
          toast({
            title: 'Re-entrega enviada',
            status: 'success',
          });
        }
      },
    });
  };

  const handleReviewChange = ({
    grade,
    revisionRequested,
  }: {
    grade: Nullable<number>;
    revisionRequested: boolean;
  }) => {
    const reviewId = review?.id;
    const baseVariables = {
      courseId: course?.id,
      revisionRequested,
      ...(!revisionRequested ? { grade } : {}), // Only set grade if no revision requested
    };

    const onCompleted = (_: unknown, errors: Nullable<PayloadError[]>) => {
      setShowSpinner(false);
      if (!errors?.length) {
        toast({
          title: 'Corrección actualizada',
          status: 'success',
        });
      } else {
        toast({
          title: 'Error al actualizar la corrección, intentelo de nuevo',
          status: 'error',
        });
      }
    };

    /* If review did not exist, create it, otherwise update it*/
    setShowSpinner(true);
    if (!reviewId) {
      commitCreateMutation({
        variables: {
          ...baseVariables,
          submissionId,
        },
        onCompleted,
      });
    } else {
      commitUpdateMutation({
        variables: {
          ...baseVariables,
          id: reviewId,
        },
        onCompleted,
      });
    }
  };

  const submitterItem = isGroup ? (
    <TextListItem
      iconProps={{
        color: LIST_ITEM_ICON_COLOR,
        icon: PeopleIcon,
      }}
      text={groupParticipants
        .filter(p => p.group.id === submission.submitter.id)
        .map(({ user }) => `${user.name} ${user.lastName}`)
        .join(', ')}
      listItemKey={'name'}
    />
  ) : (
    <TextListItem
      iconProps={{
        color: LIST_ITEM_ICON_COLOR,
        icon: PersonFillIcon,
      }}
      text={`${submitter.name} ${submitter.lastName} (${submitter.file})`}
      listItemKey={'name'}
    />
  );

  const headingText = isGroup
    ? groupParticipants.find(p => p.group.id === submission.submitter.id)?.group.name
    : submitter.lastName;

  // TODO. Mover a un componente aparte
  // te lo pido por favor.
  const SubmissionDetails = () => (
    <Stack gap="20px">
      <Heading size="md">Detalles</Heading>
      <List spacing="20px">
        {submitterItem}
        <TextListItem
          listItemKey={'submittedOnTime'}
          iconProps={{
            color: submittedOnTime ? 'teachHub.green' : 'teachHub.red',
            icon: submittedOnTime ? CheckCircleFillIcon : XCircleFillIcon,
          }}
          label={
            submittedOnTime
              ? 'Entrega realizada en fecha'
              : 'Entrega realizada fuera de fecha'
          }
          text={` (${formatAsSimpleDateTime(submission.submittedAt)})`}
        />
        <TextListItem
          iconProps={{
            color: LIST_ITEM_ICON_COLOR,
            icon: MortarBoardIcon,
          }}
          text={
            reviewer
              ? `${reviewer.reviewer.name} ${reviewer.reviewer.lastName}`
              : 'Sin asignar'
          }
          label={'Corrector: '}
          listItemKey={'reviewer'}
        />
        <ListItem
          iconProps={{
            color: LIST_ITEM_ICON_COLOR,
            icon: InfoIcon,
          }}
          label={'Estado actual corrección: '}
          listItemKey={'status'}
        >
          <ReviewStatusBadge reviewStatusConfiguration={reviewStatusConfiguration} />
        </ListItem>
        <ListItem
          iconProps={{
            color: LIST_ITEM_ICON_COLOR,
            icon: NumberIcon,
          }}
          label={'Calificación: '}
          listItemKey={'grade'}
        >
          <ReviewGradeBadge
            grade={review?.grade}
            gradeConfiguration={gradeConfiguration}
          />
        </ListItem>
        {/* Show comments button if not empty */}
        {!!comments.length && (
          <ListItem>
            <ButtonWithIcon
              onClick={onOpenCommentsModal}
              text={'Ver comentarios en el pull request'}
              icon={CommentIcon}
              variant={'ghost'}
              borderWidth={'1px'}
              borderColor={'teachHub.black'}
            />
          </ListItem>
        )}
        <ListItem>
          <SubmissionStates submission={submission} review={review} />
        </ListItem>
      </List>
    </Stack>
  );

  const Title = () => (
    <Flex direction="row" gap={'20px'} align={'center'}>
      <Heading>
        Entrega | {headingText} |{' '}
        <RRLink
          to={buildAssignmentRoute(course.id, assignment.id)}
          color={'teachHub.primaryLight'}
        >
          {assignment.title}
        </RRLink>
      </Heading>
      <Tooltip label={'Ir a repositorio'}>
        <Link
          href={getGithubRepoUrlFromPullRequestUrl(submission.pullRequestUrl)}
          isExternal
        >
          <IconButton
            variant={'ghost'}
            aria-label="repository-link"
            icon={<RepositoryIcon />}
          />
        </Link>
      </Tooltip>
      <Tooltip label={'Ir a pull request'}>
        <Link href={submission.pullRequestUrl} isExternal>
          <IconButton
            variant={'ghost'}
            aria-label="pull-request-link"
            icon={<PullRequestIcon />}
          />
        </Link>
      </Tooltip>
    </Flex>
  );

  return (
    <>
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
      <Grid gap="30px" templateRows="auto auto 90%" templateColumns="49% auto 49%">
        <GridItem
          display="grid"
          justifyContent={'space-between'}
          gridAutoFlow={'column'}
          rowSpan={1}
          colSpan={3}
        >
          <Title />
          <CarrouselNavigationControls courseId={course.id} submissionId={submissionId} />
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          {context.userHasPermission(Permission.SetReview) && (
            <ButtonWithIcon
              onClick={onOpenReviewModal}
              text={'Calificar'}
              icon={PencilIcon}
              isDisabled={!reviewEnabled}
              onPointerDown={e => showWarningToastIfNotReviewer()}
            />
          )}
          {context.userHasPermission(Permission.SubmitAssignment) && (
            <ButtonWithIcon
              text={'Re-entregar'}
              icon={IterationsIcon}
              isDisabled={!viewerCanSubmitAgain}
              onClick={handleSubmitButtonClick}
            />
          )}
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <SubmissionDetails />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Divider bgColor="grey" h="95%" />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <SubmissionMetrics
            pullRequestUrl={submission.pullRequestUrl}
            queryRef={submission}
          />
        </GridItem>
        <ReviewModal
          onSave={handleReviewChange}
          onClose={onCloseReviewModal}
          isOpen={isOpenReviewModal}
          isSecondTimeReview={!!review}
        />
        <CommentsModal
          onClose={onCloseCommentsModal}
          isOpen={isOpenCommentsModal}
          comments={comments as CommentType[]}
          viewerGithubUserId={data.viewer?.githubId}
        />
      </Grid>
    </>
  );
};

const CommentsModal = ({
  onClose,
  isOpen,
  comments,
  viewerGithubUserId,
}: {
  onClose: () => void;
  isOpen: boolean;
  comments: CommentType[];
  viewerGithubUserId: Nullable<string>;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      headerText={'Comentarios del Pull Request'}
      contentProps={{
        maxHeight: '80vh',
        overflowY: 'auto', // Make modal scrollable
        minWidth: '60vw',
        maxWidth: '60vw',
      }}
    >
      <Stack gap={'20px'}>
        {comments.map(comment => {
          const currentViewerComment = comment.githubUserId === viewerGithubUserId;

          return (
            comment.body && (
              <Flex
                width={'100%'}
                justifyContent={!currentViewerComment ? 'flex-start' : 'flex-end'} // If own comment, on right, otherwise on left
              >
                <Flex
                  bg={
                    currentViewerComment
                      ? 'teachHub.chatOwnBackground'
                      : 'teachHub.chatOtherBackground'
                  }
                  padding={'30px'}
                  borderRadius={'20'}
                  maxWidth={'90%'}
                >
                  <Stack direction={'column'} width={'100%'} justifyContent={'flex-end'}>
                    <Text>
                      <Text
                        color={
                          currentViewerComment
                            ? 'teachHub.chatOwnText'
                            : 'teachHub.chatOtherText'
                        }
                        fontWeight={'bold'}
                        display="inline" // Text within another text
                      >
                        {comment.githubUsername}
                      </Text>
                      {comment.createdAt
                        ? ` (${formatAsSimpleDateTime(comment.createdAt)})`
                        : ''}
                    </Text>
                    <Divider orientation={'horizontal'} borderColor={'teachHub.black'} />
                    <MarkdownText markdown={comment.body} />
                  </Stack>
                </Flex>
              </Flex>
            )
          );
        })}
      </Stack>
    </Modal>
  );
};

const SubmissionPageContainer = () => {
  const courseContext = useUserContext();
  const { submissionId } = useParams();

  if (!courseContext.courseId || !submissionId) {
    return null;
  }

  return (
    <PageDataContainer>
      <SubmissionPage context={courseContext} submissionId={submissionId} />
    </PageDataContainer>
  );
};

// Pantalla de entregas de un TP en particular.
export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionPageContainer />
      </Suspense>
    </Navigation>
  );
};
