import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import {
  FeedPersonIcon,
  KebabHorizontalIcon,
  CloudIcon,
  MortarBoardIcon,
  PersonIcon,
  TerminalIcon,
} from '@primer/octicons-react';
import { CloseIcon } from '@chakra-ui/icons';

import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Button from 'components/Button';
import Table from 'components/Table';

import { CourseUsersQuery } from '__generated__/CourseUsersQuery.graphql';

import CourseUsersQueryDef from 'graphql/CourseUsersQuery';

type Course = NonNullable<
  NonNullable<CourseUsersQuery['response']['viewer']>['findCourse']
>;

type CourseUserRole = NonNullable<Course['userRoles']>[number];

const UsersList = ({
  userRoles,
  roleFilter,
}: {
  userRoles: readonly CourseUserRole[];
  roleFilter: string[];
}): JSX.Element => {
  const _userRoles = userRoles;

  return (
    <Table
      headers={['', 'Nombre', 'Padron', 'Email', 'Rol', 'Fecha de creacion', '']}
      cellsContent={_userRoles.map(userRole => {
        return [
          <PersonIcon size="medium" />,
          `${userRole?.user?.name} ${userRole?.user?.lastName}`,
          userRole?.user?.file,
          userRole?.user?.notificationEmail,
          userRole?.role?.name,
          new Date().toDateString(),
          <Button variant={'ghost'}>
            <KebabHorizontalIcon />
          </Button>,
        ];
      })}
    />
  );
};

const UsersContainer = () => {
  const { courseId, roleFilter } = useParams();

  const data = useLazyLoadQuery<CourseUsersQuery>(CourseUsersQueryDef, {
    courseId: courseId || '',
  });

  if (!data?.viewer?.id) return null;

  const course = data.viewer.findCourse;

  if (!course?.userRoles) {
    return null;
  }

  return (
    <Box padding="5px 35px">
      <Heading size="md">Usuarios</Heading>
      <Box padding="30px 0px">
        <UsersList userRoles={course?.userRoles} roleFilter={[]} />
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
