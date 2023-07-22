import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query SubmissionQuery($courseId: ID!, $assignmentId: ID!, $submissionId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignment(id: $assignmentId) {
          id
          title
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
