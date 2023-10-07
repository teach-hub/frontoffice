import { Link } from 'react-router-dom';
import { HStack } from '@chakra-ui/react';
import { useUserContext } from 'hooks/useUserCourseContext';

import { buildAssignmentsRoute, buildSubmissionsRoute, buildUsersRoute } from 'routes';

const Routes = () => {
  const { courseId } = useUserContext();
  return (
    <HStack pl="10px" spacing="30px">
      <Link to="/courses">Cursos</Link>
      {courseId && (
        <>
          <Link to={buildAssignmentsRoute(courseId)}>Trabajos prácticos</Link>
          <Link to={buildSubmissionsRoute(courseId)}>Entregas</Link>
          <Link to={buildUsersRoute(courseId)}>Usuarios</Link>
        </>
      )}
    </HStack>
  );
};

export default Routes;
