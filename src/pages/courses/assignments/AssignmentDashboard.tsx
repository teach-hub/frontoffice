import { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';
import {
  AlertIcon,
  PencilIcon,
  PeopleIcon,
  PersonIcon,
  TrashIcon,
  StarIcon,
} from '@primer/octicons-react';

import { theme } from 'theme';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import Navigation from 'components/Navigation';
import IconButton from 'components/IconButton';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import List from 'components/list/List';
import Text from 'components/Text';
import Card from 'components/Card';

import AssignmentQueryDef from 'graphql/AssignmentQuery';

import type { AssignmentQuery } from '__generated__/AssignmentQuery.graphql';
import { DateListItem } from 'components/list/DateListItem';
import { TextListItem } from 'components/list/TextListItem';
import { LinkListItem } from 'components/list/LinkListItem';

const AssignmentDashboardPage = ({
  assignmentId,
  courseId,
}: {
  assignmentId: string;
  courseId: string;
}) => {
  const navigate = useNavigate();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
    courseId,
  });

  const assignment = data.viewer?.course?.assignment;

  if (!assignment) {
    return null;
  }

  const LIST_ITEM_ICON_COLOR = theme.colors.teachHub.white;

  const viewerCanSubmit =
    assignment.isOpenForSubmissions && !assignment.viewerAlreadyMadeSubmission;

  return (
    <PageDataContainer>
      <Heading>{assignment.title}</Heading>
      <Flex margin="20px 0px" gap={'20px'}>
        {courseContext.userHasPermission(Permission.EditAssignment) && (
          <IconButton
            onClick={() => navigate(`edit`)}
            aria-label={'Edit'}
            icon={<PencilIcon size={'medium'} />}
            variant={'ghost'}
            color={theme.colors.teachHub.black}
          />
        )}
        {courseContext.userHasPermission(Permission.DeleteAssignment) && (
          <IconButton
            // TODO: TH-93 Delete assignments (with a confirmation pop up)
            onClick={() => null}
            aria-label={'Delete'}
            icon={<TrashIcon size={'medium'} />}
            variant={'ghost'}
            color={theme.colors.teachHub.red}
          />
        )}
      </Flex>
      <Flex direction={'row'}>
        <Text marginEnd="80px" w={'600px'} whiteSpace="pre-wrap">
          {assignment.description}
        </Text>
        <Card>
          <List p="30px">
            <TextListItem
              label="Entrega: "
              listItemKey="?"
              iconProps={{
                color: LIST_ITEM_ICON_COLOR,
                icon: StarIcon,
              }}
              text={assignment.viewerAlreadyMadeSubmission ? 'Entregado' : 'No entregado'}
            />
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
            <LinkListItem
              listItemKey={'submissions'}
              iconColor={LIST_ITEM_ICON_COLOR}
              external={false}
              text={'Ver entregas'}
              link={'submissions'}
            />
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
                  assignment.viewerAlreadyMadeSubmission
                    ? 'Entrega realizada'
                    : 'Realizar nueva entrega'
                }
                link={'submissions/add'}
                disabled={!viewerCanSubmit}
              />
            )}
          </List>
        </Card>
      </Flex>
    </PageDataContainer>
  );
};

const AssignmentPageContainer = () => {
  const { assignmentId } = useParams();
  const { courseId } = useUserContext();

  if (!assignmentId || !courseId) {
    return null;
  }

  return <AssignmentDashboardPage assignmentId={assignmentId} courseId={courseId} />;
};

export default () => {
  return (
    <Navigation>
      <Suspense fallback={'Cargando datos'}>
        <AssignmentPageContainer />
      </Suspense>
    </Navigation>
  );
};
