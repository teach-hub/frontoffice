export enum Query {
  SubmissionAssignment = 'assignment',
}

export const buildAssignmentUrlFilter = (assignmentId: string) => {
  return `${Query.SubmissionAssignment}=${assignmentId}`;
};
