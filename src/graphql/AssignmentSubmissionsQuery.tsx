import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentSubmissionsQuery($courseId: ID!, $assignmentId: ID) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        studentsUserRoles {
          id
          user {
            id
            file
            name
            lastName
          }
        }
        assignments {
          id
          title
        }
        assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {
          id
          title
          submissions {
            id
            description
            submittedAt
            pullRequestUrl
            assignmentId
            submitterId
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
  }
`;
