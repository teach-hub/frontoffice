import { Suspense, useEffect, useState } from 'react';
import { Link as RRLink, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { PayloadError } from 'relay-runtime';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import { theme } from 'theme';
import {
  CheckCircleFillIcon,
  InfoIcon,
  MortarBoardIcon,
  NumberIcon,
  PencilIcon,
  PersonFillIcon,
  PeopleIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';

import { Flex, Select, Stack, useDisclosure } from '@chakra-ui/react';

import { formatAsSimpleDateTime } from 'utils/dates';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import { TextListItem } from 'components/list/TextListItem';
import Link from 'components/Link';
import IconButton from 'components/IconButton';
import Tooltip from 'components/Tooltip';
import Text from 'components/Text';
import Button from 'components/Button';
import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import { Modal } from 'components/Modal';
import { FormControl } from 'components/FormControl';
import { Checkbox } from 'components/Checkbox';
import { ReviewStatusBadge } from 'components/review/ReviewStatusBadge';
import { ReviewGradeBadge } from 'components/review/ReviewGradeBadge';
import { GroupRevieweeCard } from 'components/RevieweeCard';

import SubmissionQueryDef from 'graphql/SubmissionQuery';
import CreateReviewMutation from 'graphql/CreateReviewMutation';
import UpdateReviewMutation from 'graphql/UpdateReviewMutation';
import useToast from 'hooks/useToast';

import {
  getGradeConfiguration,
  getSubmissionReviewStatusConfiguration,
  GRADES,
} from 'app/submissions';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import { useSubmissionContext } from 'hooks/useSubmissionsContext';
import RepositoryIcon from 'icons/RepositoryIcon';
import PullRequestIcon from 'icons/PullRequestIcon';
import BackArrowIcon from 'icons/BackArrowIcon';
import NextArrowIcon from 'icons/NextArrowIcon';
import { getValueOfNextIndex, getValueOfPreviousIndex } from 'utils/list';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';

import {
  CreateReviewMutation as CreateReviewMutationType,
  CreateReviewMutation$data,
} from '__generated__/CreateReviewMutation.graphql';
import {
  UpdateReviewMutation as UpdateReviewMutationType,
  UpdateReviewMutation$data,
} from '__generated__/UpdateReviewMutation.graphql';

import type { Optional } from 'types';
import type { SubmissionQuery } from '__generated__/SubmissionQuery.graphql';

const SubmissionPage = ({
  context,
  submissionId,
}: {
  context: FetchedContext;
  submissionId: string;
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isOpenReviewModal,
    onOpen: onOpenReviewModal,
    onClose: onCloseReviewModal,
  } = useDisclosure();

  const [newGrade, setNewGrade] = useState<Optional<number>>(undefined);
  const [revisionRequested, setRevisionRequested] = useState<boolean>(false);

  const [commitCreateMutation, _] =
    useMutation<CreateReviewMutationType>(CreateReviewMutation);

  const [commitUpdateMutation, __] =
    useMutation<UpdateReviewMutationType>(UpdateReviewMutation);

  useEffect(() => {
    if (!isOpenReviewModal) {
      setNewGrade(undefined);
      setRevisionRequested(false);
    }
  }, [isOpenReviewModal]);

  const data = useLazyLoadQuery<SubmissionQuery>(SubmissionQueryDef, {
    courseId: context.courseId,
    submissionId,
  });

  const { submissionIds } = useSubmissionContext();

  const nextSubmissionId = getValueOfNextIndex(submissionIds, submissionId);
  const previousSubmissionId = getValueOfPreviousIndex(submissionIds, submissionId);

  if (!data.viewer || !data.viewer.course) {
    return null;
  }

  const { course } = data.viewer;
  const { submission } = course;

  if (!course || !submission) {
    return null;
  }

  const { assignment, submitter, reviewer, review } = submission;

  if (!assignment) {
    return null;
  }

  const { isGroup, groupParticipants } = assignment;

  if (!submission || !assignment || !submitter) {
    return null; // todo: fix cases when null data
  }

  const LIST_ITEM_ICON_COLOR = 'teachHub.primary';

  /* Link to assignment is going up in the path back to the assignment */
  const VIEW_ASSIGNMENT_LINK = `../../assignments/${assignment.id}`;
  const VIEW_NEXT_SUBMISSION_LINK = nextSubmissionId
    ? `../${nextSubmissionId}`
    : undefined;
  const VIEW_PREVIOUS_SUBMISSION_LINK = previousSubmissionId
    ? `../${previousSubmissionId}`
    : undefined;

  const submittedOnTime =
    !submission.submittedAt || !assignment.endDate
      ? true
      : new Date(submission.submittedAt) <= new Date(assignment.endDate);

  const reviewStatusConfiguration = getSubmissionReviewStatusConfiguration({
    grade: review?.grade,
    revisionRequested: review?.revisionRequested,
  });
  const gradeConfiguration = getGradeConfiguration(review?.grade);

  const handleReviewChange = () => {
    const reviewId = review?.id;
    const baseVariables = {
      courseId: course?.id,
      revisionRequested,
      grade: revisionRequested ? undefined : newGrade, // Only set grade if no revision requested
    };
    const onCompleted = (
      response: CreateReviewMutation$data | UpdateReviewMutation$data,
      errors: PayloadError[] | null
    ) => {
      if (!errors?.length) {
        navigate(0); // Reload page data
      } else {
        toast({
          title: 'Error al actualizar la corrección, intentelo de nuevo',
          status: 'error',
        });
      }
    };

    /* If review did not exist, create it, otherwise update it*/
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

  const reviewEnabled = !!submission?.viewerCanReview;
  const handleReviewButtonClick = () => {
    if (!reviewEnabled) {
      toast({
        title: 'No es posible calificar',
        description: 'Para calificar debes ser el corrector de la entrega',
        status: 'warning',
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

  return (
    <PageDataContainer>
      <Flex direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Flex direction="row" gap={'20px'} align={'center'}>
          <Heading>
            Entrega | {headingText} |{' '}
            <Link
              as={RRLink}
              to={VIEW_ASSIGNMENT_LINK}
              color={theme.colors.teachHub.primaryLight}
            >
              {assignment.title}
            </Link>
          </Heading>
          <Stack direction={'row'}>
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
          </Stack>
        </Flex>
        <Stack direction={'row'} gap={'5px'}>
          {VIEW_PREVIOUS_SUBMISSION_LINK && (
            <Tooltip label={'Ver entrega anterior'}>
              <Link as={RRLink} to={VIEW_PREVIOUS_SUBMISSION_LINK}>
                <IconButton
                  variant={'ghost'}
                  aria-label="previous-submission"
                  icon={<BackArrowIcon />}
                />
              </Link>
            </Tooltip>
          )}
          {VIEW_NEXT_SUBMISSION_LINK && (
            <Tooltip label={'Ver siguiente entrega'}>
              <Link as={RRLink} to={VIEW_NEXT_SUBMISSION_LINK}>
                <IconButton
                  variant={'ghost'}
                  aria-label="next-submission"
                  icon={<NextArrowIcon />}
                />
              </Link>
            </Tooltip>
          )}
        </Stack>
      </Flex>
      <Stack gap={'30px'} marginTop={'10px'}>
        <div onClick={handleReviewButtonClick}>
          <ButtonWithIcon
            onClick={onOpenReviewModal}
            text={'Calificar'}
            icon={PencilIcon}
            isDisabled={!reviewEnabled}
          />
        </div>
        <List paddingX="30px">
          {submitterItem}
          <TextListItem
            listItemKey={'submittedOnTime'}
            iconProps={{
              color: submittedOnTime
                ? theme.colors.teachHub.green
                : theme.colors.teachHub.red,
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
            label={'Estado corrección: '}
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
        </List>
        <Stack>
          <Heading fontSize={theme.styles.global.body.fontSize}>
            Comentarios al realizar la entrega
          </Heading>
          <Text w={'40vw'}>{submission.description ? submission.description : '-'}</Text>
        </Stack>
      </Stack>

      <Modal
        isOpen={isOpenReviewModal}
        onClose={onCloseReviewModal}
        isCentered
        headerText={'Calificar'}
        closeOnOverlayClick={false}
        footerChildren={
          <Flex direction={'row'} gap={'30px'}>
            <Button onClick={onCloseReviewModal} variant={'ghost'}>
              {'Cancelar'}
            </Button>
            <Button onClick={handleReviewChange}>{'Guardar'}</Button>
          </Flex>
        }
      >
        <Stack>
          <FormControl label={'Seleccionar nota'}>
            <Select
              placeholder="Selecciona una opción"
              value={newGrade}
              onChange={changes => setNewGrade(Number(changes.currentTarget.value))}
              isDisabled={revisionRequested}
            >
              {GRADES.map(grade => (
                <option value={grade} key={grade}>
                  {grade}
                </option>
              ))}
            </Select>
          </FormControl>
          <Checkbox
            id={'revisionRequested'}
            isChecked={revisionRequested}
            onChange={() => {
              setRevisionRequested(!revisionRequested);
            }}
          >
            Requiere reentrega
          </Checkbox>
        </Stack>
      </Modal>
    </PageDataContainer>
  );
};

const SubmissionPageContainer = () => {
  const courseContext = useUserContext();
  const { submissionId } = useParams();

  if (!courseContext.courseId || !submissionId) {
    return null;
  }

  return <SubmissionPage context={courseContext} submissionId={submissionId} />;
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
