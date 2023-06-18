import { Suspense } from 'react';
import { Link as ReachLink, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { AddIcon } from '@chakra-ui/icons';

import CourseAssignmentsQueryDef from 'graphql/CourseAssignmentsQuery';
import { Flex, Link, ListItem } from '@chakra-ui/react';
import { TasklistIcon } from '@primer/octicons-react';

import { formatAsSimpleDate } from 'utils/dates';

import { useUserContext, Permission } from 'hooks/useUserCourseContext';

import PageDataContainer from 'components/PageDataContainer';
import List from 'components/List';
import Navigation from 'components/Navigation';
import Box from 'components/Box';
import IconButton from 'components/IconButton';
import ListIcon from 'components/ListIcon';
import Text from 'components/Text';
import Heading from 'components/Heading';

import type { CourseAssignmentsQuery } from '__generated__/CourseAssignmentsQuery.graphql';

const AssignmentsPage = () => {
  const navigate = useNavigate();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<CourseAssignmentsQuery>(CourseAssignmentsQueryDef, {
    courseId: courseContext.courseId || '',
  });

  const assignments = data.viewer?.findCourse?.assignments || [];
  const hasAssignments = assignments.length !== 0;

  return (
    <PageDataContainer>
      <Heading>{'Trabajos Prácticos'}</Heading>
      <Flex paddingY={'30px'}>
        {hasAssignments ? (
          <List>
            {assignments.map(data => (
              <ListItem key={data.id}>
                <ListIcon icon={TasklistIcon} />
                <Link as={ReachLink} to={`${data.id}`}>
                  <span style={{ fontWeight: 'bold' }}>{data.title}</span>
                </Link>
                {data.endDate ? ` (${formatAsSimpleDate(data.endDate)})` : ''}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>{'Aún no se ha creado ningún trabajo práctico'}</Text>
        )}
      </Flex>

      {courseContext.userHasPermission(Permission.CreateAssignment) && (
        <Box position="fixed" bottom="30px" right="30px">
          <IconButton
            icon={<AddIcon boxSize={'50%'} />}
            boxSize={'65px'}
            borderRadius={'full'}
            aria-label="Add"
            onClick={() => navigate(`create`)}
          />
        </Box>
      )}
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <Suspense>
        <AssignmentsPage />
      </Suspense>
    </Navigation>
  );
};
