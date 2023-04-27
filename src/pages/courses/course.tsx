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

import type { CourseInfoQuery } from '__generated__/CourseInfoQuery.graphql';
import type { courseInfo$key } from '__generated__/courseInfo.graphql';

type Props = {
  findCourse: courseInfo$key;
};

const CourseStatistics = () => {
  const navigate = useNavigate();

  return (
    <HStack padding="30px 0px" spacing="30px">
      <StatCard
        onClick={() => navigate('users')}
        title="Profesores"
        stat="1"
        icon={<MortarBoardIcon size="large" />}
      />
      <StatCard
        onClick={() => navigate('users')}
        title="Alumnos"
        stat="3"
        icon={<PersonIcon size="large" />}
      />
      <StatCard
        onClick={() => navigate('assignments')}
        title="Enunciados"
        stat="3"
        icon={<TerminalIcon size="large" />}
      />
      <GithubStatusCard />
    </HStack>
  );
};

const CourseInfo = ({ findCourse }: Props) => {
  const data = useFragment(
    graphql`
      fragment courseInfo on CourseType {
        id
        subject {
          name
        }
      }
    `,
    findCourse
  );

  return (
    <Box padding="0px 30px">
      <Heading>{data.subject.name}</Heading>
      <Divider orientation="horizontal" />
      <CourseStatistics />
    </Box>
  );
};

const CourseViewContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, {
    courseId: params.courseId || '',
  });

  if (!data.viewer || !data.viewer.findCourse) return null;

  return <CourseInfo findCourse={data.viewer.findCourse} />;
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
