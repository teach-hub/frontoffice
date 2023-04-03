import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import Navigation from 'components/Navigation';

import AssignmentQueryDef from 'graphql/AssignmentQuery';
import type { AssignmentQuery, AssignmentQuery$data } from '__generated__/AssignmentQuery.graphql';

type Assignment = NonNullable<NonNullable<NonNullable<AssignmentQuery$data['viewer']>['findCourse']>['findAssignment']>;

const AssignmentPage = ({ assignment }: { assignment: Assignment }) => {
  return (
    <>
      {assignment.title}
      {assignment.link}
    </>
  );
}


const AssignmentPageContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<AssignmentQuery>(
    AssignmentQueryDef,
    {
      courseId: params.courseId || '',
      assignmentId: params.assignmentId || ''
    }
  );

  if (!data.viewer?.findCourse?.findAssignment) return null;

  return (
    <AssignmentPage assignment={data.viewer?.findCourse?.findAssignment} />
  )
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <AssignmentPageContainer />
      </Navigation>
    </Suspense>
  )
}
