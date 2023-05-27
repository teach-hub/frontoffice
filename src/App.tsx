import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

import { ContextProvider } from 'hooks/useUserContext';
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

  console.log('hey');

  return isAuthenticated(token) ? (
    children
  ) : (
    <Navigate to="/login" state={{ redirectTo: location.pathname }} />
  );
};

const LoginLayout = (): JSX.Element => {
  const [token] = useLocalStorage('token', null);
  const { state: locationState } = useLocation();

  if (!isAuthenticated(token)) {
    return (
      <LoginPage redirectTo={locationState ? locationState.redirectTo : undefined} />
    );
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
      <Route path="/login" element={<LoginLayout />} />
      <Route
        path="/invites/:inviteId"
        element={
          <ProtectedLayout>
            <InvitePage />
          </ProtectedLayout>
        }
      />
      <Route path="/">
        <Route
          index
          element={
            <ProtectedLayout>
              <HomePage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <UserProfilePage />
            </ProtectedLayout>
          }
        />
        <Route path="courses">
          <Route
            index
            element={
              <ProtectedLayout>
                <UserCoursesPage />
              </ProtectedLayout>
            }
          />
          <Route path=":courseId">
            <Route
              index
              element={
                <ProtectedLayout>
                  <CoursePage />
                </ProtectedLayout>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedLayout>
                  <CourseUsersPage />
                </ProtectedLayout>
              }
            />
            <Route path="assignments">
              <Route
                index
                element={
                  <ProtectedLayout>
                    <CourseAssignmentsPage />
                  </ProtectedLayout>
                }
              />

              <Route
                path="create"
                element={
                  <ProtectedLayout>
                    <CreateOrUpdateAssignmentsPage />
                  </ProtectedLayout>
                }
              />
              <Route path=":assignmentId">
                <Route
                  index
                  element={
                    <ProtectedLayout>
                      <AssignmentPage />
                    </ProtectedLayout>
                  }
                />
                <Route
                  path="edit"
                  element={
                    <ProtectedLayout>
                      <CreateOrUpdateAssignmentsPage />
                    </ProtectedLayout>
                  }
                />
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
        <ContextProvider>
          <App />
        </ContextProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </ChakraProvider>
);

export default AppRoot;
