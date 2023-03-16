import { Suspense } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyLoadQuery, useFragment } from 'react-relay';

import { Stack } from '@chakra-ui/react';

import Box from '../../components/Box';

import type { courseQuery } from '__generated__/courseQuery.graphql';
import type { courseInfo$key } from '__generated__/courseInfo.graphql';

const Fragment = graphql`
  fragment courseInfo on CourseType {
    users {
      name
      lastName
      file
    }
    year
    period
    name
    role {
      name
      parent {
        id
        name
      }
      permissions
    }
    subject {
      id
      code
      active
      name
    }
  }
`;

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
    <Box onClick={() => navigate('users')}> Usuarios </Box>
  )
}

const CourseInfo = ({ findCourse }: Props) => {
  const data = useFragment(Fragment, findCourse);

  return (
    <Box>
      <CourseStatistics />
      <CourseUsers />
    </Box>
  )
}

const CourseViewContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<courseQuery>(
    graphql`
      query courseQuery($courseId: Int!) {
        viewer {
          id
          name
          findCourse(id: $courseId) {
            ...courseInfo
          }
        }
      }
    `,
    { courseId: Number(params.courseId) }
  );

  if (!data.viewer || !data.viewer.findCourse) return null;

  return (
    <>
      <CourseInfo findCourse={data.viewer.findCourse}/>
    </>
  )
}

export default () => {

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CourseViewContainer />
    </Suspense>
  )
}
