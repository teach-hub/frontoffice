import { Suspense, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery, useFragment } from 'react-relay';

import { HStack } from '@chakra-ui/react';
import { MortarBoardIcon, PersonIcon, TerminalIcon } from '@primer/octicons-react';

import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Divider from 'components/Divider';
import StatCard from 'components/StatCard';
import GithubStatusCard from 'components/GithubStatusCard';

import CourseInfoQueryDef from 'graphql/CourseInfoQuery';

import type {
  CourseInfoQuery,
  CourseInfoQuery$data,
} from '__generated__/CourseInfoQuery.graphql';

type Props = {
  course: NonNullable<NonNullable<CourseInfoQuery$data['viewer']>['findCourse']>;
};

const CourseStatistics = ({ course }: Props) => {
  const navigate = useNavigate();

  return (
    <HStack padding="20px 0px" spacing="30px">
      <StatCard
        onClick={() => navigate('users')}
        title="Profesores"
        stat={String(course.studentsCount)}
        icon={<MortarBoardIcon size="large" />}
      />
      <StatCard
        onClick={() => navigate('users')}
        title="Alumnos"
        stat={String(course.teachersCount)}
        icon={<PersonIcon size="large" />}
      />
      <StatCard
        onClick={() => navigate('assignments')}
        title="Enunciados"
        stat={String(course.assignments.length)}
        icon={<TerminalIcon size="large" />}
      />
      <GithubStatusCard />
    </HStack>
  );
};

const CourseDashboard = ({ course }: Props) => {
  return (
    <Box padding="0px 30px">
      <Heading size="md">
        {course.name} - {course.subject.name}
      </Heading>
      <Divider orientation="horizontal" />
      <CourseStatistics course={course} />
    </Box>
  );
};

const CourseViewContainer = () => {
  const { courseId } = useParams();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, {
    courseId: courseId || '',
  });

  if (!data.viewer || !data.viewer.findCourse) {
    return null;
  }

  return <CourseDashboard course={data.viewer.findCourse} />;
};

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <CourseViewContainer />
      </Navigation>
    </Suspense>
  );
};
