import { RelayEnvironmentProvider } from 'react-relay';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from 'relayEnvironment';

import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFound';

import UserProfilePage from 'pages/UserProfile';

import UserCoursesPage from 'pages/courses';
import CoursePage from 'pages/courses/course';
import CourseUsersPage from 'pages/courses/users';
import CourseProjectsPage from 'pages/courses/projects';
import ProjectPage from 'pages/courses/projects/project';

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
        <Route index element={<ProtectedLayout children={<HomePage />} />} />
        <Route
          path="/profile"
          element={<ProtectedLayout children={<UserProfilePage />} />}
        />
        <Route path="courses">
          <Route index element={<ProtectedLayout children={<UserCoursesPage />} />} />
          <Route path=":courseId">
            <Route index element={<ProtectedLayout children={<CoursePage />} />} />
            <Route
              path="users"
              element={<ProtectedLayout children={<CourseUsersPage />} />}
            />
            <Route path="projects">
              <Route
                index
                element={<ProtectedLayout children={<CourseProjectsPage />} />}
              />
              <Route
                path=":projectId"
                element={<ProtectedLayout children={<ProjectPage />} />}
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
