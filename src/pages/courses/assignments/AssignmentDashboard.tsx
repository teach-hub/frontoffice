import { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';
import {
  AlertIcon,
  PencilIcon,
  PeopleIcon,
  PersonIcon,
  StarIcon,
  TrashIcon,
} from '@primer/octicons-react';

import { theme } from 'theme';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import Navigation from 'components/Navigation';
import Button from 'components/Button';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import List from 'components/list/List';
import Text from 'components/Text';
import Card from 'components/Card';
import Skeleton from 'components/Skeleton';

import AssignmentQueryDef from 'graphql/AssignmentQuery';

import type {
  AssignmentQuery,
  AssignmentQuery$data,
} from '__generated__/AssignmentQuery.graphql';
import { DateListItem } from 'components/list/DateListItem';
import { TextListItem } from 'components/list/TextListItem';
import { LinkListItem } from 'components/list/LinkListItem';
import { buildAssignmentUrlFilter } from 'queries';

type Course = NonNullable<NonNullable<AssignmentQuery$data['viewer']>['course']>;
type Assignment = NonNullable<Course['assignment']>;

const LIST_ITEM_ICON_COLOR = theme.colors.teachHub.white;

function AssignmentDetails({ assignment }: { assignment: Assignment }) {
  const courseContext = useUserContext();

  const viewerCanSubmit = assignment.isOpenForSubmissions && !assignment.viewerSubmission;

  return (
    <Card>
      <List p="30px">
        {courseContext.userHasPermission(Permission.SubmitAssignment) && (
          <TextListItem
            label="Entrega: "
            listItemKey="entrega"
            iconProps={{
              color: LIST_ITEM_ICON_COLOR,
              icon: StarIcon,
            }}
            text={assignment.viewerSubmission ? 'Entregado' : 'No entregado'}
          />
        )}
        <TextListItem
          iconProps={{
            color: LIST_ITEM_ICON_COLOR,
            icon: assignment.isGroup ? PeopleIcon : PersonIcon,
          }}
          text={assignment.isGroup ? 'Entrega grupal' : 'Entrega individual'}
          listItemKey={'isGroup'}
        />
        <DateListItem
          date={assignment.startDate}
          label={'Inicio de entregas: '}
          listItemKey={'startDate'}
          iconColor={LIST_ITEM_ICON_COLOR}
        />
        <DateListItem
          date={assignment.endDate}
          label={'Fecha límite de entregas: '}
          listItemKey={'endDate'}
          iconColor={LIST_ITEM_ICON_COLOR}
        />
        {courseContext.userIsTeacher && (
          <TextListItem
            listItemKey={'allowLateSubmissions'}
            iconProps={{
              color: LIST_ITEM_ICON_COLOR,
              icon: AlertIcon,
            }}
            text={assignment.allowLateSubmissions ? 'Permitidas' : 'No Permitidas'}
            label={'Entregas fuera de fecha: '}
          />
        )}
        {assignment.link ? (
          <LinkListItem
            listItemKey={'link'}
            iconColor={LIST_ITEM_ICON_COLOR}
            link={assignment.link}
            text={'Ver enunciado'}
            external={true}
          />
        ) : (
          <></>
        )}
        {courseContext.userIsTeacher && (
          <LinkListItem
            listItemKey={'submissions'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={'Ver entregas'}
            link={`../../submissions?${buildAssignmentUrlFilter(assignment.id)}`}
          />
        )}
        {!courseContext.userIsTeacher && (
          <LinkListItem
            listItemKey={'submissions'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={'Ver entrega'}
            link={`../../submissions/${assignment.viewerSubmission?.id}`}
            disabled={!assignment.viewerSubmission?.id}
          />
        )}
        {courseContext.userHasPermission(Permission.AssignReviewer) && (
          <LinkListItem
            listItemKey={'assignReviewers'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={'Assignar correctores'}
            link={'assign-reviewers'}
          />
        )}
        {courseContext.userHasPermission(Permission.SubmitAssignment) && (
          <LinkListItem
            listItemKey={'addSubmission'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={
              assignment.viewerSubmission ? 'Entrega realizada' : 'Realizar nueva entrega'
            }
            link={'add-submission'}
            disabled={!viewerCanSubmit}
          />
        )}
        {courseContext.userHasPermission(Permission.CreateRepository) && (
          <LinkListItem
            listItemKey={'createRepository'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={'Crear repositorios'}
            link={`new-repo/${assignment.isGroup ? 'groups' : 'students'}`}
          />
        )}
        {courseContext.userHasPermission(Permission.ViewGroups) && assignment.isGroup && (
          <LinkListItem
            listItemKey={'viewGroups'}
            iconColor={LIST_ITEM_ICON_COLOR}
            external={false}
            text={'Ver grupos'}
            link={`groups`}
          />
        )}
      </List>
    </Card>
  );
}

function AssignmentActions() {
  const courseContext = useUserContext();
  const navigate = useNavigate();

  const actions = [];

  if (courseContext.userHasPermission(Permission.EditAssignment)) {
    actions.push(
      <Button leftIcon={<PencilIcon />} onClick={() => navigate(`edit`)}>
        Editar
      </Button>
    );
  }

  if (courseContext.userHasPermission(Permission.DeleteAssignment)) {
    actions.push(
      <Button
        // TODO: TH-93 Delete assignments (with a confirmation pop up)
        onClick={() => null}
        leftIcon={<TrashIcon />}
        color={theme.colors.teachHub.red}
      >
        Eliminar
      </Button>
    );
  }

  return (
    <Flex gap="5px" direction={'row'}>
      {actions}
    </Flex>
  );
}

const AssignmentDashboardPage = ({
  assignmentId,
  courseId,
}: {
  assignmentId: string;
  courseId: string;
}) => {
  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
    courseId,
  });

  const assignment = data.viewer?.course?.assignment;

  if (!assignment) {
    return null;
  }

  return (
    <>
      <Flex gap="50px" justifyContent={'space-between'} alignItems={'center'}>
        <Heading textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace="nowrap">
          {assignment.title}
        </Heading>
        <AssignmentActions />
      </Flex>
      <Flex direction="row" justifyContent="space-between">
        <Text w={'50%'}>{assignment.description}</Text>
        <AssignmentDetails assignment={assignment} />
      </Flex>
    </>
  );
};

const EmptyState = () => {
  return (
    <>
      <Skeleton h="35px" />
      <Skeleton h="35px" />
      <Skeleton h="35px" />
      <Skeleton h="35px" />
    </>
  );
};

const AssignmentPageContainer = () => {
  const { assignmentId } = useParams();
  const courseContext = useUserContext();
  const courseId = courseContext.courseId;

  if (!assignmentId || !courseId) {
    return null;
  }

  return (
    <PageDataContainer w="70em" gap="25px">
      <Suspense fallback={<EmptyState />}>
        <AssignmentDashboardPage assignmentId={assignmentId} courseId={courseId} />
      </Suspense>
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <AssignmentPageContainer />
    </Navigation>
  );
};
