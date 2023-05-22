import { Suspense } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { HStack } from '@chakra-ui/react';
import { MortarBoardIcon, PersonIcon, TerminalIcon } from '@primer/octicons-react';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import Divider from 'components/Divider';
import StatCard from 'components/StatCard';
import GithubStatusCard from 'components/GithubStatusCard';

import { useUserContext } from 'hooks/useUserContext';

import CourseInfoQueryDef from 'graphql/CourseInfoQuery';

import type {
  CourseInfoQuery,
  CourseInfoQuery$data,
} from '__generated__/CourseInfoQuery.graphql';
import { PageDataContainer } from '../../components/PageDataContainer';

type Props = {
  course: NonNullable<NonNullable<CourseInfoQuery$data['viewer']>['findCourse']>;
};

const CourseStatistics = ({ course }: Props) => {
  const navigate = useNavigate();

  const handleGoToTeachers = () => {
    const search = `?${createSearchParams({ role: 'teacher' })}`;
    navigate({ pathname: 'users', search });
  };

  const handleGoToStudents = () => {
    const search = `?${createSearchParams({ role: 'student' })}`;
    navigate({ pathname: 'users', search });
  };

  return (
    <HStack margin="20px 0px" spacing="30px">
      <StatCard
        onClick={handleGoToTeachers}
        title="Profesores"
        stat={String(course.teachersCount)}
        icon={<MortarBoardIcon size="large" />}
      />
      <StatCard
        onClick={handleGoToStudents}
        title="Alumnos"
        stat={String(course.studentsCount)}
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
    <PageDataContainer>
      <Heading>
        {course.name} - {course.subject.name}
      </Heading>
      <Divider orientation="horizontal" />
      <CourseStatistics course={course} />
    </PageDataContainer>
  );
};

const CourseViewContainer = () => {
  const { courseId } = useParams();
  const courseContext = useUserContext();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, {
    courseId: courseId || '',
  });

  if (!data.viewer || !data.viewer.findCourse) {
    return null;
  }

  const course = data.viewer.findCourse;

  return <CourseDashboard course={course} />;
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
