import { MouseEvent, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Navigation from 'components/Navigation';
import Box from 'components/Box';
import Card from 'components/Card';

import CourseAssignmentsQueryDef from 'graphql/CourseAssignmentsQuery';
import type { CourseAssignmentsQuery, CourseAssignmentsQuery$data } from '__generated__/CourseAssignmentsQuery.graphql';

type Assignment = NonNullable<NonNullable<CourseAssignmentsQuery$data['viewer']>['findCourse']>['assignments'][number];

const AssignmentOverviewCard = ({ assignment }: { assignment: Assignment }) => {
  const navigate = useNavigate();

  const handleCardClick = (_: MouseEvent<HTMLDivElement>) => {
    navigate(`${assignment.id}`)
  }

  return (
    <Card onClick={handleCardClick}>
      <Box>
        {assignment.title}
      </Box>
    </Card>
  )
}

const AssignmentsPage = () => {
  const params = useParams();

  const data = useLazyLoadQuery<CourseAssignmentsQuery>(
    CourseAssignmentsQueryDef,
    { courseId: params.courseId || '' }
  );

  return (
    <>
      {data.viewer?.findCourse?.assignments.map(
        data => <AssignmentOverviewCard assignment={data} />
      )}
    </>
  )
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <AssignmentsPage />
      </Navigation>
    </Suspense>
  )
}
