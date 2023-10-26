import { Navigate } from 'react-router-dom';

import { useUserContext } from 'hooks/useUserCourseContext';

type Props = { children: React.ReactNode };

// Wrapper usado para restringir el acceso a una ruta solo a profesores
// Si el usuario no es profesor, se redirige a la página del curso.
// Si el usuario es profesor, se renderiza el contenido.

export default (props: Props) => {
  const userContext = useUserContext();

  if (!userContext) {
    console.log('No user context');
    return <Navigate to="/login" />;
  }

  if (!userContext.userIsTeacher) {
    console.log('User is not teacher, redirecting to course page');
    return <Navigate to={`/courses/${userContext.courseId}`} />;
  }

  return <>{props.children}</>;
};
