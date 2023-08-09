import { useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import Skeleton from 'components/Skeleton';

import SubmitAssignment from 'layout/SubmitAssignmentContainer';

import { useUserContext } from 'hooks/useUserCourseContext';

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
