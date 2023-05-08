import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { Stack, Badge } from '@chakra-ui/react';

import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';
import UserCard from 'components/UserCard';

import { CourseUsersQuery } from '__generated__/CourseUsersQuery.graphql';

import CourseUsersQueryDef from 'graphql/CourseUsersQuery';

type Course = NonNullable<
  NonNullable<CourseUsersQuery['response']['viewer']>['findCourse']
>;
type CourseUserRole = NonNullable<Course['userRoles']>[number];

const UsersList = ({ userRoles }: { userRoles: CourseUserRole[] }) => {
  return (
    <Stack gap="10px">
      {userRoles.map(
        (userRole, i) =>
          userRole?.user &&
          userRole?.role && (
            <UserCard
              key={i}
              user={{
                roleName: userRole.role.name,
                name: userRole.user.name,
                lastName: userRole.user.lastName,
                file: userRole.user.file,
              }}
            />
          )
      )}
    </Stack>
  );
};

const UsersContainer = () => {
  const { courseId } = useParams();

  const data = useLazyLoadQuery<CourseUsersQuery>(CourseUsersQueryDef, {
    courseId: courseId || '',
  });

  if (!data?.viewer?.id) return null;

  const course = data.viewer.findCourse;

  return (
    <Box padding="5px 35px">
      <Heading size="md">Usuarios</Heading>
      <Box padding="30px 0px">
        {/* @ts-expect-error */}
        <UsersList userRoles={course?.userRoles} />
      </Box>
    </Box>
  );
};

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <UsersContainer />
      </Navigation>
    </Suspense>
  );
};
