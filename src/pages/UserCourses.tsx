import { MouseEvent, Suspense } from 'react';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

import { Card, CardBody, IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Text from '../components/Text';
import Heading from '../components/Heading';
import Box from '../components/Box';

import type { UserCoursesQuery$data, UserCoursesQuery } from '__generated__/UserCoursesQuery.graphql';

const Query = graphql`
  query UserCoursesQuery {
    viewer {
      courses {
        name
        year
        period
        role {
          name
          permissions
        }
        subject {
          id
          code
          active
          name
        }
      }
    }
  }
`;

type Course = NonNullable<NonNullable<UserCoursesQuery$data['viewer']>['courses']>[number];

const UserCourseCard = ({ course }: { course: Course }) => {

  if (!course) return null;

  const { role, subject: { code: subjectCode, name: subjectName } } = course;
  const subjectTitle = [subjectCode, subjectName].join(' - ');

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
  }

  return (
    <Card margin="10px" borderColor="black" background="blue.50" variant='outline'>
      <CardBody onClick={handleCardClick} display="flex" alignItems="center">

        <Heading flex="1" size="md">{course?.name}</Heading>
        <Text flex="1">{course?.year}</Text>
        <Text flex="1">{subjectTitle}</Text>

        <Badge fontSize="md" variant="subtle" colorScheme="blue">{role.name}</Badge>

        <Box display="flex" flexDirection="row-reverse" alignItems="center" flex="1">
          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<CloseIcon />}
          />
        </Box>
      </CardBody>
    </Card>
  );
}


type Viewer = NonNullable<UserCoursesQuery$data['viewer']>;

const UserCoursesList = ({ data }: { data: Viewer }) => {

  return <>
    {data.courses.map(course =>
      <UserCourseCard course={course} />
    )}
  </>
}


const UserCoursesContainer = () => {
  const data = useLazyLoadQuery<UserCoursesQuery>(Query, {});

  if (!data.viewer) return null;

  return <UserCoursesList data={data.viewer} />
}

export default () => {
  return (
    <Suspense fallback={<div> Cargando... </div>}>
      <UserCoursesContainer />
    </Suspense>
  )
}
