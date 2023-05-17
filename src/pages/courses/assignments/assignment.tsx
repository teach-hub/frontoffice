import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Navigation from 'components/Navigation';
import type { AssignmentQuery$data } from '__generated__/AssignmentQuery.graphql';
import { Flex, Text } from '@chakra-ui/react';
import { formatAsSimpleDateTime } from '../../../utils/dates';
import { getAssignment } from '../../../graphql/utils/assignments';

type Assignment = NonNullable<AssignmentQuery$data['findAssignment']>;

const AssignmentPage = ({ assignment }: { assignment: Assignment }) => {
  return (
    <Flex direction={'column'}>
      <Text>{assignment.id}</Text>
      <Text>{assignment.title}</Text>
      <Text>{assignment.description}</Text>
      <Text>{assignment.link}</Text>
      <Text>
        {assignment.startDate ? formatAsSimpleDateTime(assignment.startDate) : ''}
      </Text>
      <Text>{assignment.endDate ? formatAsSimpleDateTime(assignment.endDate) : ''}</Text>
    </Flex>
  );
};

const AssignmentPageContainer = () => {
  const params = useParams();

  const assignment = getAssignment({
    assignmentId: params.assignmentId || '',
  });

  if (!assignment) return null;

  return <AssignmentPage assignment={assignment} />;
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
