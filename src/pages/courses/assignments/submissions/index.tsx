import { Suspense } from 'react';

import { KebabHorizontalIcon } from '@primer/octicons-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import PageDataContainer from 'components/PageDataContainer';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Table from 'components/Table';
import Button from 'components/Button';
import Box from 'components/Box';

import { useUserContext } from 'hooks/useUserCourseContext';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import type { AssignmentSubmissionsQuery } from '__generated__/AssignmentSubmissionsQuery.graphql';

const SubmissionsPage = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  if (!assignmentId || !courseContext.courseId) {
    return null;
  }

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId,
    courseId: courseContext.courseId,
  });

  const submissions = data.viewer?.findCourse?.findAssignment?.submissions || [];

  return (
    <PageDataContainer>
      <Heading>Entregas</Heading>
      <Box padding="30px 0px">
        <Table
          headers={['Alumno', 'Email', 'Fecha entrega', '']}
          rowOptions={submissions.map(s => {
            return {
              content: [
                `${s.user.name} ${s.user.lastName}`,
                s.description,
                new Date(s.submittedAt).toLocaleString(),
                <Button variant={'ghost'}>
                  <KebabHorizontalIcon />
                </Button>,
              ],
            };
          })}
        />
      </Box>
    </PageDataContainer>
  );
};

// Pantalla de entregas de un TP en particular.
export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionsPage />
      </Suspense>
    </Navigation>
  );
};
