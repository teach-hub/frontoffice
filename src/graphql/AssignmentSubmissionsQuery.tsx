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
        assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {
          id
          title
          isGroup
          submissions {
            id
            description
            submittedAt
            pullRequestUrl
            assignmentId
            submitter {
              __typename
              ... on InternalGroupType {
                id
                groupName: name
                usersForAssignment {
                  id
                  name
                  lastName
                  file
                }
              }
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
          nonExistentSubmissions {
            submitter {
              __typename
              ... on InternalGroupType {
                id
                groupName: name
                usersForAssignment {
                  id
                  name
                  lastName
                  file
                }
              }
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
          }
        }
      }
    }
  }
`;
