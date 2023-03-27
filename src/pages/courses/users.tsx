import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { Card, CardBody, IconButton, Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';

import { CourseUsersQuery } from '__generated__/CourseUsersQuery.graphql';

import CourseUsersQueryDef from 'graphql/CourseUsersQuery'

type Course = NonNullable<NonNullable<CourseUsersQuery['response']['viewer']>['findCourse']>;
type CourseUserRole = NonNullable<Course['userRoles']>[number];

const RoleNameBadge = ({ roleName }: { roleName: string }) => {
  return <Badge fontSize="md" variant="solid" colorScheme="green">{roleName}</Badge>
}

const UserCard = ({ userRole }: { userRole: CourseUserRole }) => {
  if (!userRole) return null;

  const { user, role } = userRole;

  const userFullName = `${user?.lastName}, ${user?.name}`

  return (
    <Card shadow="md" margin="10px" borderColor="black" background="blue.50" variant='outline'>
      <CardBody display="flex" alignItems="center">
        <Heading flex="1" size="md">{userFullName}</Heading>

        <Badge marginRight="40px" marginLeft="40px" fontSize="sm" variant="subtle" colorScheme="blue">{user?.file}</Badge>

        {role?.name && <RoleNameBadge roleName={role?.name} />}

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
  )
}

const UsersList = ({ userRoles }: { userRoles: CourseUserRole[] }) => {
  return (
    <>
      {userRoles.map((userRole, i) => <UserCard key={i} userRole={userRole} />)}
    </>
  )
}

const UsersContainer = () => {
  const { courseId } = useParams();

  const data = useLazyLoadQuery<CourseUsersQuery>(CourseUsersQueryDef, { courseId: courseId || '' });

  if (!data?.viewer?.id) return null;

  const course = data.viewer.findCourse;

  return (
    // @ts-expect-error
    <UsersList userRoles={course?.userRoles} />
  );
}

export default () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Navigation>
        <UsersContainer />
      </Navigation>
    </Suspense>
  )
}
