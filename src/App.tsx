import { RelayEnvironmentProvider } from 'react-relay';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
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
import CreateOrUpdateAssignmentsPage from 'pages/courses/assignments/CreateOrUpdateAssingments';
import CreateRepository, { RepositoryType } from 'pages/courses/CreateRepository';
import SubmissionsPage from 'pages/courses/assignments/submissions';
import SubmissionPage from 'pages/courses/assignments/submissions/submission';
import GroupsPage from 'pages/courses/assignments/groups/index';
import AddSubmissionPage from 'pages/courses/assignments/submissions/add';
import AssignReviewersPage from 'pages/courses/assignments/reviewers';

import { ContextProvider } from 'hooks/useUserCourseContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { isAuthenticated } from 'auth/utils';

import { theme } from 'theme';
import MyGroups from 'pages/courses/groups/MyGroups';
import { SubmissionProvider } from 'hooks/useSubmissionsContext';

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
            <Route path="add-submission" element={<AddSubmissionPage />} />
            <Route path="my-groups" element={<MyGroups />} />
            <Route path="assignments">
              <Route index element={<CourseAssignmentsPage />} />
              <Route path="create" element={<CreateOrUpdateAssignmentsPage />} />
              <Route path=":assignmentId">
                <Route index element={<AssignmentPage />} />
                <Route path="assign-reviewers" element={<AssignReviewersPage />} />
                <Route path="groups" element={<GroupsPage />} />
                <Route path="edit" element={<CreateOrUpdateAssignmentsPage />} />
                <Route path="add-submission" element={<AddSubmissionPage />} />
                <Route path="new-repo">
                  <Route
                    path="students"
                    element={<CreateRepository type={RepositoryType.Students} />}
                  />
                  <Route
                    path="groups"
                    element={<CreateRepository type={RepositoryType.Groups} />}
                  />
                </Route>
              </Route>
            </Route>
            <Route
              path="submissions"
              element={
                <SubmissionProvider>
                  <Outlet />
                </SubmissionProvider>
              }
            >
              <Route index element={<SubmissionsPage />} />
              <Route path=":submissionId" element={<SubmissionPage />} />
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
