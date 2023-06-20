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

import { FetchedContext, useUserContext } from 'hooks/useUserCourseContext';

import SubmissionsQuery from 'graphql/AssignmentSubmissionsQuery';

import type { AssignmentSubmissionsQuery } from '__generated__/AssignmentSubmissionsQuery.graphql';

const SubmissionsPage = ({
  courseContext,
  assignmentId,
}: {
  courseContext: FetchedContext;
  assignmentId: string;
}) => {
  const navigate = useNavigate();

  const data = useLazyLoadQuery<AssignmentSubmissionsQuery>(SubmissionsQuery, {
    assignmentId,
    courseId: courseContext.courseId,
  });

  const submissions = data.viewer?.course?.assignment?.submissions || [];

  return (
    <PageDataContainer>
      <Heading>Entregas</Heading>
      <Box padding="30px 0px">
        <Table
          headers={['Alumno', 'Email', 'Fecha entrega', '']}
          rowOptions={submissions.map(s => {
            return {
              rowProps: {
                onClick: () => navigate(s.id),
              },
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

const SubmissionsPageContainer = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  if (!assignmentId || !courseContext.courseId) {
    return null;
  }

  return <SubmissionsPage courseContext={courseContext} assignmentId={assignmentId} />;
};

// Pantalla de entregas de un TP en particular.
export default () => {
  return (
    <Navigation>
      <Suspense>
        <SubmissionsPageContainer />
      </Suspense>
    </Navigation>
  );
};
