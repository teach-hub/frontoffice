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
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';

import environment from 'relayEnvironment';
import NotFoundPage from 'pages/NotFound';
import UserProfilePage from 'pages/UserProfile';
import UserCoursesPage from 'pages/courses';
import CoursePage from 'pages/courses/course';
import CourseUsersPage from 'pages/courses/users';
import CourseAssignmentsPage from 'pages/courses/assignments';
import LoginPage from 'pages/Login';
import AssignmentPage from 'pages/courses/assignments/AssignmentDashboard';
import InvitePage from 'pages/Invite';
import CreateAssignmentPage from 'pages/courses/assignments/create';
import UpdateAssignmentPage from 'pages/courses/assignments/update';
import CreateRepository, { RepositoryType } from 'pages/courses/CreateRepository';
import SubmissionsPage from 'pages/courses/assignments/submissions';
import SubmissionPage from 'pages/courses/assignments/submissions/submission';
import GroupsPage from 'pages/courses/assignments/groups/index';
import AddSubmissionPage from 'pages/courses/assignments/submissions/add';
import AssignReviewersPage from 'pages/courses/assignments/reviewers';
import MyGroups from 'pages/courses/groups/MyGroups';

import { ContextProvider } from 'hooks/useUserCourseContext';
import { storeGetValue } from 'hooks/useLocalStorage';
import { SubmissionProvider } from 'hooks/useSubmissionsContext';

import { buildLoginRoute } from 'routes';

import { isAuthenticated } from 'auth/utils';

import { theme } from 'theme';

/*
 * Way to solve protected routes, as routes can not
 * be wrapped in other components
 * */
const ProtectedLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  const token = storeGetValue('token');
  const location = useLocation();

  if (isAuthenticated(token)) {
    return children;
  }

  console.log(`User not authenticated, redirecting to /login`);

  return <Navigate to={buildLoginRoute()} state={{ redirectTo: location.pathname }} />;
};

const App = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Outlet />
          </ProtectedLayout>
        }
      >
        <Route index element={<Navigate to="/courses" />} />
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
              <Route path="create" element={<CreateAssignmentPage />} />
              <Route path=":assignmentId">
                <Route index element={<AssignmentPage />} />
                <Route path="assign-reviewers" element={<AssignReviewersPage />} />
                <Route path="groups" element={<GroupsPage />} />
                <Route path="edit" element={<UpdateAssignmentPage />} />
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
