import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentSubmissionsQuery($courseId: ID!, $assignmentId: ID) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignments {
          id
          title
        }

        submissions(assignmentId: $assignmentId) {
          id
          description
          submittedAt
          pullRequestUrl
          assignmentId
          submitter {
            ... on UserType {
              id
              file
              name
              lastName
            }
          }
          reviewer {
            id
            reviewer {
              id
              name
              lastName
            }
          }
          review {
            id
            revisionRequested
            grade
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;
