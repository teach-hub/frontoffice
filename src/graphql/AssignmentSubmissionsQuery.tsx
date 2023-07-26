import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentSubmissionsQuery($courseId: ID!, $assignmentId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignment(id: $assignmentId) {
          id
          submissions {
            id
            description
            submittedAt
            pullRequestUrl
            submitter {
              ... on UserType {
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
  }
`;
