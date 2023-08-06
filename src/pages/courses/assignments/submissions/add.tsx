import { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Skeleton from 'components/Skeleton';

import SubmitAssignment from 'layout/SubmitAssignmentContainer';

import { useUserContext } from 'hooks/useUserCourseContext';

import type { AddSubmissionQuery$data } from '__generated__/AddSubmissionQuery.graphql';
import type { CreateSubmissionMutation as CreateSubmissionMutationType } from '__generated__/CreateSubmissionMutation.graphql';

// TODO(Tomas).
// - Si el TP esta entregado no deberia poder acceder a esta pagina.
// - Si el TP esta entregado --> error
// - Si el TP esta fuera de termino --> error
// - Si el TP esta antes de la fecha --> error
// - Si el tipo no tiene grupo --> error
//

function EmptyState() {
  return (
    <>
      <Heading> Nueva entrega </Heading>
      <Skeleton h="50px" />
      <Skeleton h="50px" />
      <Skeleton h="50px" />
    </>
  );
}

function PageContainer() {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  if (!courseContext.courseId) {
    return null;
  }

  return (
    <PageDataContainer gap="30px">
      <Suspense fallback={<EmptyState />}>
        <SubmitAssignment courseId={courseContext.courseId} assignmentId={assignmentId} />
      </Suspense>
    </PageDataContainer>
  );
}

export default () => {
  return (
    <Navigation>
      <PageContainer />
    </Navigation>
  );
};
