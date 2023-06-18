import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query SubmissionQuery($courseId: String!, $assignmentId: String!, $submissionId: ID!) {
    viewer {
      id
      name
      findCourse(id: $courseId) {
        id
        findAssignment(id: $assignmentId) {
          id
          submission(id: $submissionId) {
            id
            description
            submittedAt
            user {
              id
              file
              name
              lastName
            }
          }
        }
      }
    }
  }
`;
