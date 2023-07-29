import React, { Suspense, useEffect, useState } from 'react';
import { Link as RRLink, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery, useMutation } from 'react-relay';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import SubmissionQueryDef from 'graphql/SubmissionQuery';

import type { SubmissionQuery } from '__generated__/SubmissionQuery.graphql';
import List from 'components/list/List';
import { theme } from 'theme';
import { TextListItem } from 'components/list/TextListItem';
import {
  CheckCircleFillIcon,
  InfoIcon,
  MarkGithubIcon,
  MortarBoardIcon,
  NumberIcon,
  PencilIcon,
  PersonFillIcon,
  XCircleFillIcon,
} from '@primer/octicons-react';
import Link from 'components/Link';
import { formatAsSimpleDateTime } from 'utils/dates';
import { Flex, Select, Stack, useDisclosure } from '@chakra-ui/react';
import IconButton from 'components/IconButton';
import Tooltip from 'components/Tooltip';
import Text from 'components/Text';
import Button from 'components/Button';
import { Icon } from '@chakra-ui/icons';
import { Modal } from 'components/Modal';
import { Optional } from 'types';
import { FormControl } from 'components/FormControl';
import { Checkbox } from 'components/Checkbox';
import {
  CreateReviewMutation as CreateReviewMutationType,
  CreateReviewMutation$data,
} from '__generated__/CreateReviewMutation.graphql';
import CreateReviewMutation from 'graphql/CreateReviewMutation';
import useToast from 'hooks/useToast';

const SubmissionPage = ({
  context,
  assignmentId,
  submissionId,
}: {
  context: FetchedContext;
  assignmentId: string;
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

  useEffect(() => {
    if (!isOpenReviewModal) {
      setNewGrade(undefined);
      setRevisionRequested(false);
    }
  }, [isOpenReviewModal]);

  const data = useLazyLoadQuery<SubmissionQuery>(SubmissionQueryDef, {
    courseId: context.courseId,
    assignmentId,
    submissionId,
  });

  const viewer = data.viewer;
  const course = viewer?.course;
  const assignment = course?.assignment;
  const submission = assignment?.submission;
  const user = submission?.submitter; // TODO: TH-164 may be user or group
  const reviewerUser = submission?.reviewer?.reviewer;
  const review = submission?.review;

  if (!submission || !assignment || !user) {
    return null; // todo: fix cases when null data
  }

  const LIST_ITEM_ICON_COLOR = theme.colors.teachHub.primary;

  /* Link to assignment is going up in the path back to the assignment */
  const VIEW_ASSIGNMENT_LINK = `../..`;

  const submittedOnTime =
    !submission.submittedAt || !assignment.endDate
      ? true
      : new Date(submission.submittedAt) <= new Date(assignment.endDate);

  const getReviewStatus = () => {
    const grade = review?.grade;
    const revisionRequested = review?.revisionRequested;
    if (grade) {
      return 'Corregido';
    } else if (revisionRequested) {
      return 'Reentrega solicitada';
    } else {
      return 'Sin corregir';
    }
  };

  const handleReviewChange = () => {
    commitCreateMutation({
      variables: {
        submissionId,
        revisionRequested,
        grade: revisionRequested ? undefined : newGrade, // Only set grade if no revision requested
      },
      onCompleted: (response: CreateReviewMutation$data, errors) => {
        if (!errors?.length) {
          navigate(0); // Reload page data
        } else {
          toast({
            title: 'Error al actualizar la corrección, intentelo de nuevo',
            status: 'error',
          });
        }
      },
    });
  };

  return (
    <PageDataContainer>
      <Flex direction="row" gap={'20px'} align={'center'}>
        <Heading>
          Entrega | {user.lastName} |{' '}
          <Link
            as={RRLink}
            to={VIEW_ASSIGNMENT_LINK}
            isExternal
            color={theme.colors.teachHub.primaryLight}
          >
            {assignment.title}
          </Link>
        </Heading>

        <Tooltip
          hasArrow
          label={'Ir a pull request'}
          fontSize={theme.styles.global.body.fontSize}
        >
          <Link href={submission.pullRequestUrl} isExternal>
            <IconButton
              variant={'ghost'}
              aria-label="pull-request-link"
              icon={<MarkGithubIcon size="medium" />}
            />
          </Link>
        </Tooltip>
      </Flex>

      <Stack gap={'30px'} marginTop={'10px'}>
        <Button onClick={onOpenReviewModal} width={'fit-content'}>
          <Flex align="center">
            <Icon as={PencilIcon} boxSize={6} marginRight={2} />
            <Text>Calificar</Text>
          </Flex>
        </Button>
        <List paddingX="30px">
          <TextListItem
            iconProps={{
              color: LIST_ITEM_ICON_COLOR,
              icon: PersonFillIcon,
            }}
            text={`${user.name} ${user.lastName} (${user.file})`}
            listItemKey={'name'}
          />
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
              reviewerUser
                ? `${reviewerUser.name} ${reviewerUser.lastName}`
                : 'Sin asignar'
            }
            label={'Corrector: '}
            listItemKey={'reviewer'}
          />
          <TextListItem
            iconProps={{
              color: LIST_ITEM_ICON_COLOR,
              icon: InfoIcon,
            }}
            text={`${getReviewStatus()}`} // TODO: show in badge to highlight
            label={'Estado corrección: '}
            listItemKey={'status'}
          />
          <TextListItem
            iconProps={{
              color: LIST_ITEM_ICON_COLOR,
              icon: NumberIcon,
            }}
            text={`${review?.grade || '-'}`} // TODO: show in badge to highlight
            label={'Calificación: '}
            listItemKey={'grade'}
          />
        </List>
        <Stack>
          <Heading fontSize={theme.styles.global.body.fontSize}>
            Comentarios al realizar la entrega
          </Heading>
          <Text w={'40vw'}>{submission.description}</Text>
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(grade => (
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
  const { assignmentId, submissionId } = useParams();

  if (!assignmentId || !courseContext.courseId || !submissionId) {
    return null;
  }

  return (
    <SubmissionPage
      context={courseContext}
      assignmentId={assignmentId}
      submissionId={submissionId}
    />
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
