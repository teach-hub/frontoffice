export const buildCoursesRoute = () => '/courses';
export const buildLoginRoute = () => '/login';

export const buildCourseRoute = (courseId: string) => `/courses/${courseId}`;

export const buildAddAssignmentRoute = (courseId: string) =>
  `/courses/${courseId}/assignments/create`;
export const buildEditAssignmentRoute = (courseId: string) =>
  `/courses/${courseId}/assignments/edit`;
export const buildAddSubmissionRoute = (courseId: string) =>
  `/courses/${courseId}/add-submissions`;

export const buildAssignmentRoute = (courseId: string, assignmentId: string) =>
  `/courses/${courseId}/assignments/${assignmentId}`;

export const buildSubmissionRoute = (courseId: string, submissionId: string) =>
  `/courses/${courseId}/submissions/${submissionId}`;
export const buildMyGroupsRoute = (courseId: string) => `/courses/${courseId}/my-groups`;
export const buildAssignmentsRoute = (courseId: string) =>
  `/courses/${courseId}/assignments`;
export const buildSubmissionsRoute = (courseId: string) =>
  `/courses/${courseId}/submissions`;
export const buildUsersRoute = (courseId: string) => `/courses/${courseId}/users`;
