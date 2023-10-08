import { HStack } from '@chakra-ui/react';
import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import {
  buildAssignmentsRoute,
  buildCourseRoute,
  buildMyGroupsRoute,
  buildSubmissionsRoute,
  buildUsersRoute,
} from 'routes';
import Link from 'components/RRLink';

const Routes = () => {
  const { courseId, subjectName, userIsTeacher, userHasPermission } = useUserContext();

  return (
    <HStack pl="10px" spacing="30px">
      <Link to="/courses">Mis cursos</Link>
      {courseId && (
        <>
          <Link to={buildCourseRoute(courseId)}>{subjectName}</Link>
          <Link to={buildAssignmentsRoute(courseId)}>Trabajos prácticos</Link>
          <Link to={buildUsersRoute(courseId)}>Usuarios</Link>
          {userIsTeacher ? (
            <>
              <Link to={buildSubmissionsRoute(courseId)}>Entregas</Link>
            </>
          ) : (
            <>
              {userHasPermission(Permission.ManageOwnGroups) && (
                <Link to={buildSubmissionsRoute(courseId)}>Mis entregas</Link>
              )}
              <Link to={buildMyGroupsRoute(courseId)}>Mis grupos</Link>
            </>
          )}
        </>
      )}
    </HStack>
  );
};

export default Routes;
