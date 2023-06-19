import { Suspense, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { AlertIcon, KebabHorizontalIcon, PersonIcon } from '@primer/octicons-react';

import { SearchIcon } from '@chakra-ui/icons';
import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Button from 'components/Button';
import Table from 'components/Table';
import Text from 'components/Text';

import { useUserContext } from 'hooks/useUserCourseContext';
import { filterUsers, UserRoleFilter } from 'app/users';
import CourseUsersQueryDef from 'graphql/CourseUsersQuery';

import type { CourseUsersQuery } from '__generated__/CourseUsersQuery.graphql';

type Course = NonNullable<NonNullable<CourseUsersQuery['response']['viewer']>['course']>;

type CourseUserRole = NonNullable<Course['userRoles']>[number];

const UsersList = ({
  userRoles,
  roleFilter,
  nameFilter,
}: {
  userRoles: readonly CourseUserRole[];
  roleFilter: string;
  nameFilter: string | null;
}): JSX.Element => {
  let filteredUserRoles = filterUsers({
    users: userRoles,
    roleFilter: roleFilter as UserRoleFilter,
  });

  if (nameFilter) {
    filteredUserRoles = userRoles.filter(userRole => {
      const normalizedFilter = nameFilter.trim().toLowerCase();

      const nameMatches = userRole?.user.name.toLowerCase().match(normalizedFilter);
      const emailMatches = userRole?.user.notificationEmail
        .toLowerCase()
        .match(normalizedFilter);
      const fileMatches = userRole?.user.file.toLowerCase().match(normalizedFilter);

      return nameMatches || emailMatches || fileMatches;
    });
  }

  const emptyState = (
    <Box margin="90px" textAlign={'center'}>
      <Box margin="30px">
        <AlertIcon size={70} />
      </Box>
      <Heading size="md">No pudimos encontrar ningun usuario</Heading>
      <Text>
        Revisá los filtros y asegurate de que existan usuarios con esas características
      </Text>
    </Box>
  );

  return (
    <>
      <Table
        headers={['', 'Nombre', 'Padrón', 'Email', 'Rol', 'Fecha de creación', '']}
        cellsContent={filteredUserRoles.map(userRole => {
          return [
            <PersonIcon size="medium" />,
            `${userRole?.user?.name} ${userRole?.user?.lastName}`,
            userRole?.user?.file,
            userRole?.user?.notificationEmail,
            userRole?.role?.name,
            new Date().toLocaleString(),
            <Button variant={'ghost'}>
              <KebabHorizontalIcon />
            </Button>,
          ];
        })}
      />
      {!filteredUserRoles.length && emptyState}
    </>
  );
};

const UsersContainer = () => {
  const { courseId } = useUserContext();

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const roleFilter = searchParams.get('role') ?? 'all';

  const data = useLazyLoadQuery<CourseUsersQuery>(CourseUsersQueryDef, {
    courseId: courseId || '',
  });

  if (!data?.viewer?.id) return null;

  const course = data.viewer.course;

  if (!course?.userRoles) {
    return null;
  }

  const getDisplayableFilter = () => {
    switch (roleFilter) {
      case 'all':
        return '(Todos)';
      case 'teacher':
        return '(Profesores)';
      case 'student':
        return '(Alumnos)';
      default:
        return '';
    }
  };

  return (
    <Box padding="5px 35px">
      <HStack spacing="auto">
        <HStack spacing="10px">
          <Heading size="md">Usuarios</Heading>
          <Text>{getDisplayableFilter()}</Text>
        </HStack>
        <InputGroup w="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Juan Perez"
            borderColor="black"
            bgColor="white"
            onChange={event => setSearchTerm(event.target.value)}
          />
        </InputGroup>
      </HStack>
      <Box padding="30px 0px">
        <UsersList
          nameFilter={searchTerm}
          userRoles={course?.userRoles}
          roleFilter={roleFilter}
        />
      </Box>
    </Box>
  );
};

export default () => {
  return (
    <Navigation>
      <Suspense>
        <UsersContainer />
      </Suspense>
    </Navigation>
  );
};
