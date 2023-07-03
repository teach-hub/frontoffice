import { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Link as RRLink, useNavigate, useParams } from 'react-router-dom';

import { Flex, Link, ListItem } from '@chakra-ui/react';
import {
  AlertIcon,
  CalendarIcon,
  LinkExternalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { formatAsSimpleDateTime } from 'utils/dates';
import { theme } from 'theme';
import { Nullable } from 'types';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import Navigation from 'components/Navigation';
import IconButton from 'components/IconButton';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import List from 'components/List';
import Text from 'components/Text';
import ListIcon from 'components/ListIcon';
import Divider from 'components/Divider';
import Card from 'components/Card';

import AssignmentQueryDef from 'graphql/AssignmentQuery';

import type { AssignmentQuery } from '__generated__/AssignmentQuery.graphql';

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

  const DateListItem = ({
    date,
    text,
    itemKey,
  }: {
    date: Nullable<string>;
    text: string;
    itemKey: string;
  }) => (
    <ListItem key={itemKey}>
      <ListIcon color={theme.colors.teachHub.white} icon={CalendarIcon} />
      <span style={{ fontWeight: 'bold' }}>{text}</span>
      {date ? formatAsSimpleDateTime(date) : '-'}
    </ListItem>
  );

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
            onClick={() =>
              /*TODO: TH-93 Delete assignments (with a confirmation pop up) */
              navigate(`edit`)
            }
            aria-label={'Delete'}
            icon={<TrashIcon size={'medium'} />}
            variant={'ghost'}
            color={theme.colors.teachHub.red}
          />
        )}
      </Flex>
      <Flex direction={'row'}>
        <Text marginEnd="80px" width={'600px'} whiteSpace="pre-wrap">
          {assignment.description}
        </Text>
        <Card>
          <List padding="30px">
            <DateListItem
              date={assignment.startDate}
              text={'Inicio de entregas: '}
              itemKey={'startDate'}
            />
            <DateListItem
              date={assignment.endDate}
              text={'Límite de entregas: '}
              itemKey={'endDate'}
            />
            {courseContext.userIsTeacher && (
              <ListItem key={'allowLateSubmissions'}>
                <ListIcon color={theme.colors.teachHub.white} icon={AlertIcon} />
                <span style={{ fontWeight: 'bold' }}>{'Entregas fuera de fecha: '}</span>
                {assignment.allowLateSubmissions ? 'Permitidas' : 'No Permitidas'}
              </ListItem>
            )}
            {assignment.link ? (
              <ListItem key={'link'}>
                <ListIcon color={theme.colors.teachHub.white} icon={LinkExternalIcon} />
                <Link href={assignment.link} isExternal>
                  Ver enunciado
                </Link>
              </ListItem>
            ) : (
              <></>
            )}
            <ListItem>
              <ListIcon color={theme.colors.teachHub.white} icon={LinkExternalIcon} />
              <Link as={RRLink} to={'submissions'}>
                Ver entregas
              </Link>
            </ListItem>
            <ListItem>
              <ListIcon color={theme.colors.teachHub.white} icon={LinkExternalIcon} />
              <Link as={RRLink} to={'assign-reviewers'}>
                Assignar correctores
              </Link>
            </ListItem>
            {courseContext.userHasPermission(Permission.SubmitAssignment) && (
              <ListItem>
                <ListIcon color={theme.colors.teachHub.white} icon={LinkExternalIcon} />
                <Link as={RRLink} to={'submissions/add'}>
                  Realizar nueva entrega
                </Link>
              </ListItem>
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
