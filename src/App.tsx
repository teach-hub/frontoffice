import { RelayEnvironmentProvider } from 'react-relay';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from './relayEnvironment';

import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

import UserProfilePage from './pages/UserProfile';

import UserCoursesPage from './pages/courses';
import CoursePage from './pages/courses/course';
import CourseUsersPage from './pages/courses/users';
import CourseProjectsPage from './pages/courses/projects';
import ProjectPage from './pages/courses/projects/project';

import { ContextProvider } from './hooks/useUserContext';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="courses">
          <Route index element={<UserCoursesPage />} />
          <Route path=":courseId">
            <Route index element={<CoursePage />} />
            <Route path="users" element={<CourseUsersPage />} />
            <Route path="projects">
              <Route index element={<CourseProjectsPage/>} />
              <Route path=":projectId" element={<ProjectPage/>} />
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
