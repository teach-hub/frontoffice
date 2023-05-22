import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Navigation from 'components/Navigation';
import type { AssignmentQuery$data } from '__generated__/AssignmentQuery.graphql';
import { Flex, Heading, Link, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { getAssignment } from '../../../graphql/utils/assignments';
import {
  AlertIcon,
  CalendarIcon,
  LinkExternalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { formatAsSimpleDateTime } from '../../../utils/dates';
import { theme } from '../../../theme';
import { Icon } from '@primer/octicons-react/dist/icons';
import { Nullable } from '../../../types';
import IconButton from '../../../components/IconButton';
import { PageDataContainer } from '../../../components/PageDataContainer';
import { List } from '../../../components/List';

type AssignmentDashboard = NonNullable<AssignmentQuery$data['findAssignment']>;

const AssignmentDashboardPage = ({
  assignment,
  courseId,
}: {
  assignment: AssignmentDashboard;
  courseId: string;
}) => {
  const navigate = useNavigate();

  const AssignmentListIcon = ({ icon }: { icon: Icon }) => (
    <ListIcon as={icon} color={theme.colors.teachHub.primary} boxSize={'5'} />
  );

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
      <AssignmentListIcon icon={CalendarIcon} />
      <span style={{ fontWeight: 'bold' }}>{text}</span>
      {date ? formatAsSimpleDateTime(date) : '-'}
    </ListItem>
  );

  return (
    <PageDataContainer>
      <Flex align={'center'}>
        <Heading>{assignment.title}</Heading>
        <Flex marginLeft={'40px'} gap={'20px'}>
          <IconButton
            onClick={() =>
              /*TODO: TH-93 Delete assignments (with a confirmation pop up) */
              navigate(`/courses/${courseId}/assignments/${assignment.id}/edit`)
            }
            aria-label={'Edit'}
            icon={<PencilIcon size={'medium'} />}
            variant={'ghost'}
            color={theme.colors.teachHub.black}
          />
          <IconButton /* TODO: TH-114 show based on permissions */
            onClick={() =>
              navigate(`/courses/${courseId}/assignments/${assignment.id}/edit`)
            }
            aria-label={'Delete'}
            icon={<TrashIcon size={'medium'} />}
            variant={'ghost'}
            color={theme.colors.teachHub.red}
          />
        </Flex>
      </Flex>
      <Flex direction={'column'} gap={'30px'} width={'50%'} paddingY={'30px'}>
        <Text width={'25vw'} whiteSpace="pre-wrap">
          {assignment.description}
        </Text>
        <List>
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
          <ListItem key={'allowLateSubmissions'}>
            {/* TODO: TH-114 show based on permissions */}
            <AssignmentListIcon icon={AlertIcon} />
            <span style={{ fontWeight: 'bold' }}>{'Entregas fuera de fecha: '}</span>
            {assignment.allowLateSubmissions == true ? 'Permitidas' : 'No Permitidas'}
          </ListItem>
          {assignment.link ? (
            <ListItem key={'link'}>
              <AssignmentListIcon icon={LinkExternalIcon} />
              <Link href={assignment.link} isExternal>
                Ver enunciado
              </Link>
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </Flex>
    </PageDataContainer>
  );
};

const AssignmentPageContainer = () => {
  const params = useParams();
  const courseId = params.courseId;

  const assignment = getAssignment({
    assignmentId: params.assignmentId || '',
  });

  if (!assignment || !courseId) return null;

  return <AssignmentDashboardPage assignment={assignment} courseId={courseId} />;
};

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <AssignmentPageContainer />
      </Navigation>
    </Suspense>
  );
};
