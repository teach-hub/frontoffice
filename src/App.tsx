import { RelayEnvironmentProvider } from 'react-relay';
import {
  Outlet,
  useLocation,
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from 'relayEnvironment';

import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFound';
import UserProfilePage from 'pages/UserProfile';
import UserCoursesPage from 'pages/courses';
import CoursePage from 'pages/courses/course';
import CourseUsersPage from 'pages/courses/users';
import CourseAssignmentsPage from 'pages/courses/assignments';
import LoginPage from 'pages/Login';
import AssignmentPage from 'pages/courses/assignments/AssignmentDashboard';
import InvitePage from 'pages/Invite';

import { ContextProvider } from 'hooks/useUserCourseContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { isAuthenticated } from 'auth/utils';

import { theme } from 'theme';
import CreateOrUpdateAssignmentsPage from './pages/courses/assignments/CreateOrUpdateAssingments';

/*
 * Way to solve protected routes, as routes can not
 * be wrapped in other components
 * */
const ProtectedLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [token] = useLocalStorage('token', null);
  const location = useLocation();

  if (isAuthenticated(token)) {
    return children;
  }

  console.log(`User not authenticated, redirecting to ${location.pathname}`);

  return <Navigate to="/login" state={{ redirectTo: location.pathname }} />;
};

const LoginLayout = (): JSX.Element => {
  const [token] = useLocalStorage('token', null);
  const { state: locationState } = useLocation();

  if (!isAuthenticated(token)) {
    const redirectTo = locationState ? locationState.redirectTo : undefined;

    return <LoginPage redirectTo={redirectTo} />;
  }

  /*
   * Si el usuario ya esta logueado /login devuelve a Home.
   *
   */
  return <Navigate to={'/'} />;
};

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginLayout />} />
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Outlet />
          </ProtectedLayout>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="invites/:inviteId" element={<InvitePage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="courses">
          <Route index element={<UserCoursesPage />} />
          <Route
            path=":courseId"
            element={
              <ContextProvider>
                <Outlet />
              </ContextProvider>
            }
          >
            <Route index element={<CoursePage />} />
            <Route path="users" element={<CourseUsersPage />} />
            <Route path="assignments">
              <Route index element={<CourseAssignmentsPage />} />
              <Route path="create" element={<CreateOrUpdateAssignmentsPage />} />
              <Route path=":assignmentId">
                <Route index element={<AssignmentPage />} />
                <Route path="edit" element={<CreateOrUpdateAssignmentsPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

const AppRoot = () => (
  <ChakraProvider theme={theme}>
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </ChakraProvider>
);

export default AppRoot;
