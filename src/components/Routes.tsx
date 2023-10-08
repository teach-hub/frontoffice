import { Link } from 'react-router-dom';
import { HStack } from '@chakra-ui/react';
import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import {
  buildMyGroupsRoute,
  buildAssignmentsRoute,
  buildSubmissionsRoute,
  buildUsersRoute,
} from 'routes';

const Routes = () => {
  const { courseId, userIsTeacher, userHasPermission } = useUserContext();

  return (
    <HStack pl="10px" spacing="30px">
      <Link to="/courses">Cursos</Link>
      {courseId && (
        <>
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
