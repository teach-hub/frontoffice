import { MouseEvent, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { Card, CardBody, IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Text from '../../components/Text';
import Heading from '../../components/Heading';
import Box from '../../components/Box';
import Navigation from '../../components/Navigation';

import UserCoursesQueryDef from '../../graphql/UserCoursesQuery'
import { UserCoursesQuery, UserCoursesQuery$data } from '__generated__/UserCoursesQuery.graphql';

type Viewer = NonNullable<UserCoursesQuery$data['viewer']>;

type UserRole = NonNullable<NonNullable<Viewer['userRoles']>[number]>;

const CourseCard = ({ userRole }: { userRole: UserRole }) => {
  const navigate = useNavigate();

  if (!userRole) return null;

  const { course, role } = userRole;

  if (!course || !role) return null;

  const { name: courseName, year: courseYear, subject: { code: subjectCode, name: subjectName } } = course;
  const { name: roleName } = role;

  const subjectTitle = [subjectCode, subjectName].join(' - ');

  const handleCardClick = (_: MouseEvent<HTMLDivElement>) => {
    navigate(`/courses/${userRole.course?.id}`)
  }

  return (
    <Card shadow="md" margin="10px" borderColor="black" background="blue.50" variant='outline'>
      <CardBody onClick={handleCardClick} display="flex" alignItems="center">

        <Heading flex="1" size="md">{courseName}</Heading>
        <Text flex="1">{courseYear}</Text>
        <Text flex="1">{subjectTitle}</Text>

        <Badge fontSize="md" variant="subtle" colorScheme="blue">{roleName}</Badge>

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

const CoursesList = ({ userRoles }: { userRoles: UserRole[] }) => {
  return (
    <>
      {userRoles.map((userRole, i) =>
        <CourseCard key={i} userRole={userRole} />
      )}
    </>
  )
}


const CoursesContainer = () => {
  const data = useLazyLoadQuery<UserCoursesQuery>(UserCoursesQueryDef, {});

  if (!data.viewer || !data.viewer.userRoles) {
    return null;
  }

  const viewerRoles = data.viewer.userRoles.filter(userRole => !!userRole) as UserRole[];

  return <CoursesList userRoles={viewerRoles} />
}

export default () => (
  <Suspense fallback={<Box h="300px" w="900px" bgColor="black"> Cargando... </Box>}>
    <Navigation>
      <CoursesContainer />
    </Navigation>
  </Suspense>
)
