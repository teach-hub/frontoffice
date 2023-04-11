import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from 'relayEnvironment';

import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFound';

import UserProfilePage from 'pages/UserProfile';

import UserCoursesPage from 'pages/courses';
import CoursePage from 'pages/courses/course';
import CourseUsersPage from 'pages/courses/users';
import CourseAssignmentsPage from 'pages/courses/assignments';
import AssignmentPage from 'pages/courses/assignments/assignment';

import { ContextProvider } from 'hooks/useUserContext';
import LoginPage from './pages/Login';
import { useLocalStorage } from './hooks/useLocalStorage';
import { isAuthenticated } from './auth/utils';

/*
 * Way to solve protected routes, as routes can not
 * be wrapped in other components
 * */
const ProtectedLayout = ({ children }: { children: any }) => {
  const [token, _] = useLocalStorage('token', null);
  return isAuthenticated(token) ? children : <Navigate to={'/login'} />;
};

const LoginLayout = () => {
  const [token, _] = useLocalStorage('token', null);
  return isAuthenticated(token) ? <Navigate to={'/'} /> : <LoginPage />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />} />
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
                path=":assignmentId"
                element={
                  <ProtectedLayout>
                    <AssignmentPage />
                  </ProtectedLayout>
                }
              />
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
  <ChakraProvider>
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
