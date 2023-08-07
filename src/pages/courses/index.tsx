import { MouseEvent, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { Badge, Flex, IconButton, Skeleton, Stack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import Text from 'components/Text';
import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Card from 'components/Card';
import PageDataContainer from 'components/PageDataContainer';

import UserCoursesQueryDef from 'graphql/UserCoursesQuery';
import {
  UserCoursesQuery,
  UserCoursesQuery$data,
} from '__generated__/UserCoursesQuery.graphql';

import { theme } from 'theme';

type Viewer = NonNullable<UserCoursesQuery$data['viewer']>;

type UserRole = NonNullable<NonNullable<Viewer['userRoles']>[number]>;

const CourseCard = ({ userRole }: { userRole: UserRole }) => {
  const navigate = useNavigate();

  if (!userRole) return null;

  const { course, role } = userRole;

  if (!course || !role) return null;

  const {
    name: courseName,
    year: courseYear,
    subject: { code: subjectCode, name: subjectName },
  } = course;

  const { name: roleName } = role;

  const subjectTitle = [subjectCode, subjectName].join(' - ');

  const handleCardClick = (_: MouseEvent<HTMLDivElement>) => {
    navigate(`/courses/${userRole.course?.id}`);
  };

  return (
    <Card display="flex" flex="1" onClick={handleCardClick} fontSize={'lg'}>
      <Text flex="1">{subjectTitle}</Text>
      <Text flex="1" size="md">
        {courseName}
      </Text>
      <Text flex="1">{courseYear}</Text>

      <Badge
        fontSize="md"
        variant="subtle"
        backgroundColor={theme.colors.teachHub.white}
        color={theme.colors.teachHub.black}
        borderRadius={'5px'}
      >
        {roleName}
      </Badge>

      <Flex flexDirection="row-reverse" alignItems="center" flex="1">
        <IconButton variant="ghost" aria-label="See menu" icon={<CloseIcon />} />
      </Flex>
    </Card>
  );
};

const CoursesList = ({ userRoles }: { userRoles: UserRole[] }) => {
  return (
    <Stack gap="10px">
      {userRoles.map((userRole, i) => (
        <CourseCard key={i} userRole={userRole} />
      ))}
    </Stack>
  );
};

const CoursesContainer = () => {
  const data = useLazyLoadQuery<UserCoursesQuery>(UserCoursesQueryDef, {});

  if (!data.viewer || !data.viewer.userRoles) {
    return null;
  }

  const viewerRoles = data.viewer.userRoles.filter(userRole => !!userRole) as UserRole[];

  return <CoursesList userRoles={viewerRoles} />;
};

function CourseContainerEmptyState() {
  return (
    <Box display="flex" flexDir="column" gap="5px">
      <Skeleton h="80px" />
      <Skeleton h="80px" />
      <Skeleton h="80px" />
      <Skeleton h="80px" />
    </Box>
  );
}

export default () => (
  <Navigation>
    <PageDataContainer>
      <Heading>Mis cursos</Heading>
      <Box p="30px 0px">
        <Suspense fallback={<CourseContainerEmptyState />}>
          <CoursesContainer />
        </Suspense>
      </Box>
    </PageDataContainer>
  </Navigation>
);
