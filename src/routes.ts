export const buildCoursesRoute = () => '/courses';

export const buildLoginRoute = () => '/login';

export const buildCourseRoute = (courseId: string) =>
  `${buildCoursesRoute()}/${courseId}`;

export const buildAssignmentsRoute = (courseId: string) =>
  `${buildCourseRoute(courseId)}/assignments`;

export const buildSubmissionsRoute = (courseId: string) =>
  `${buildCourseRoute(courseId)}/submissions`;

export const buildUsersRoute = (courseId: string) =>
  `${buildCourseRoute(courseId)}/users`;

export const buildAddAssignmentRoute = (courseId: string) =>
  `${buildAssignmentsRoute(courseId)}/create`;

export const buildEditAssignmentRoute = (courseId: string) =>
  `${buildAssignmentsRoute(courseId)}/edit`;

export const buildAddSubmissionRoute = (courseId: string) =>
  `${buildCourseRoute(courseId)}/add-submission`;

export const buildAssignmentRoute = (courseId: string, assignmentId: string) =>
  `${buildAssignmentsRoute(courseId)}/${assignmentId}`;

export const buildSubmissionRoute = (courseId: string, submissionId: string) =>
  `${buildSubmissionsRoute(courseId)}/${submissionId}`;

export const buildMyGroupsRoute = (courseId: string) =>
  `${buildCourseRoute(courseId)}/my-groups`;
