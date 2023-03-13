import { Suspense } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { useParams } from "react-router-dom"
import { useLazyLoadQuery, useFragment } from 'react-relay';

import { Stack } from '@chakra-ui/react';

import Box from '../components/Box';


import type { CourseViewQuery, CourseViewQuery$data } from '__generated__/CourseViewQuery.graphql';
import type { CourseView$key } from '__generated__/CourseView.graphql';

const Fragment = graphql`
  fragment CourseView on ViewerCourseType {
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
  findCourse: CourseView$key
}

const CourseStatistics = ({}) => {
  return (
    <Stack direction="row">
      <Box background="red">Grafico 1</Box>
      <Box background="blue">Grafico 2</Box>
      <Box background="green">Grafico 3</Box>
    </Stack>
  )
}

const CourseInfo = ({ findCourse }: Props) => {
  const data = useFragment(Fragment, findCourse);

  return (
    <Box>
      <CourseStatistics />
    </Box>
  )
}

const CourseViewContainer = () => {
  const params = useParams();

  const data = useLazyLoadQuery<CourseViewQuery>(
    graphql`
      query CourseViewQuery($courseId: Int!) {
        viewer {
          userId
          name
          findCourse(id: $courseId) {
            ...CourseView
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
