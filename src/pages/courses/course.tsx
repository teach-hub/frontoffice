import { Suspense } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery, useFragment } from 'react-relay';

import { Stack } from '@chakra-ui/react';

import Box from 'components/Box';
import Navigation from 'components/Navigation';

import CourseInfoQueryDef from 'graphql/CourseInfoQuery';

import type { CourseInfoQuery } from '__generated__/CourseInfoQuery.graphql';
import type { courseInfo$key } from '__generated__/courseInfo.graphql';

type Props = {
  findCourse: courseInfo$key
}

const CourseStatistics = () => {
  return (
    <Stack direction="row">
      <Box background="red">Grafico 1</Box>
      <Box background="blue">Grafico 2</Box>
      <Box background="green">Grafico 3</Box>
    </Stack>
  )
}

const CourseUsers = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box onClick={() => navigate('users')}> Usuarios </Box>
      <Box onClick={() => navigate('assignments')}> Trabajos practicos </Box>
    </>
  )
}

const CourseInfo = ({ findCourse }: Props) => {
  const data = useFragment(
    graphql`
      fragment courseInfo on CourseType {
        id
        subject {
          name
        }
      }
    `, findCourse);

  return (
    <Box>
      <Box>{data.subject.name}</Box>
      <CourseStatistics />
      <CourseUsers />
    </Box>
  )
}

const CourseViewContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<CourseInfoQuery>(CourseInfoQueryDef, { courseId: params.courseId || '' });

  if (!data.viewer || !data.viewer.findCourse) return null;

  return <CourseInfo findCourse={data.viewer.findCourse}/>;
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <CourseViewContainer />
      </Navigation>
    </Suspense>
  )
}
