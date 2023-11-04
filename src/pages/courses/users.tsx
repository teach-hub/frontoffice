import { Suspense, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay';

import { AlertIcon, PersonIcon } from '@primer/octicons-react';

import { SearchIcon } from '@chakra-ui/icons';
import { HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import Heading from 'components/Heading';
import Box from 'components/Box';
import Navigation from 'components/Navigation';
import Table from 'components/Table';
import Text from 'components/Text';
import Select from 'components/Select';

import { useUserContext } from 'hooks/useUserCourseContext';
import { filterUsers, UserRoleFilter } from 'app/users';
import CourseUsersQueryDef from 'graphql/CourseUsersQuery';

import type { CourseUsersQuery } from '__generated__/CourseUsersQuery.graphql';
import PageDataContainer from 'components/PageDataContainer';

type Course = NonNullable<NonNullable<CourseUsersQuery['response']['viewer']>['course']>;
type CourseUserRole = NonNullable<Course['userRoles']>[number];

const EmptyState = () => (
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

const UsersList = ({
  userRoles,
  roleFilter,
  nameFilter,
}: {
  userRoles: readonly CourseUserRole[];
  roleFilter: UserRoleFilter;
  nameFilter: string | null;
}): JSX.Element => {
  let filteredUserRoles = filterUsers({
    users: userRoles,
    roleFilter,
  });

  if (nameFilter) {
    filteredUserRoles = filteredUserRoles.filter(userRole => {
      const normalizedFilter = nameFilter.trim().toLowerCase();

      const nameMatches = userRole?.user.name.toLowerCase().match(normalizedFilter);
      const lastNameMatches = userRole?.user.lastName
        .toLowerCase()
        .match(normalizedFilter);

      const emailMatches = userRole?.user.notificationEmail
        .toLowerCase()
        .match(normalizedFilter);

      const fileMatches = userRole?.user.file.toLowerCase().match(normalizedFilter);

      return nameMatches || lastNameMatches || emailMatches || fileMatches;
    });
  }

  const TEACHER_HEADERS = ['', 'Nombre', 'Rol', 'Email'];
  const STUDENT_HEADERS = ['', 'Nombre', 'Padrón', 'Email'];
  const ALL_HEADERS = ['', 'Nombre', 'Rol', 'Padrón', 'Email'];

  if (!filteredUserRoles.length) {
    return <EmptyState />;
  }

  if (roleFilter === UserRoleFilter.All) {
    return (
      <Table
        headers={ALL_HEADERS}
        rowOptions={filteredUserRoles.map(userRole => {
          return {
            content: [
              <PersonIcon size="medium" />,
              `${userRole?.user?.lastName}, ${userRole?.user?.name}`,
              userRole?.role?.name,
              userRole?.user?.file || '-',
              userRole?.user?.notificationEmail,
            ],
          };
        })}
      />
    );
  }

  const isTeacherPage = roleFilter === UserRoleFilter.Teacher;

  return (
    <Table
      headers={isTeacherPage ? TEACHER_HEADERS : STUDENT_HEADERS}
      rowOptions={filteredUserRoles.map(userRole => {
        return {
          content: isTeacherPage
            ? [
                <PersonIcon size="medium" />,
                `${userRole?.user?.lastName}, ${userRole?.user?.name}`,
                userRole?.role?.name,
                userRole?.user?.notificationEmail,
              ]
            : [
                <PersonIcon size="medium" />,
                `${userRole?.user?.lastName}, ${userRole?.user?.name}`,
                userRole?.user?.file,
                userRole?.user?.notificationEmail,
              ],
        };
      })}
    />
  );
};

const UsersContainer = () => {
  const { courseId } = useUserContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const roleFilter = searchParams.get('role') ?? 'all';

  const data = useLazyLoadQuery<CourseUsersQuery>(CourseUsersQueryDef, {
    courseId: courseId || '',
  });

  const course = data?.viewer?.course;

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
    <PageDataContainer>
      <HStack justifyContent="space-between">
        <HStack spacing="10px" alignItems={'center'}>
          <Heading>Usuarios</Heading>
          <Text>{getDisplayableFilter()}</Text>
        </HStack>
        <HStack>
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
          <Select
            value={roleFilter}
            onChange={({ currentTarget: { value } }) =>
              setSearchParams(value === 'all' ? {} : { role: value })
            }
          >
            <option value="all">Todos los roles</option>
            <option value="teacher">Profesores</option>
            <option value="student">Alumnos</option>
          </Select>
        </HStack>
      </HStack>
      <Box marginTop={'10px'}>
        <UsersList
          nameFilter={searchTerm}
          userRoles={course?.userRoles}
          roleFilter={roleFilter as UserRoleFilter}
        />
      </Box>
    </PageDataContainer>
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
