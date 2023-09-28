import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentSubmissionsQuery(
    $courseId: ID!
    $assignmentId: ID
    $onlyReviewerSubmissions: Boolean!
  ) {
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
          submissions(onlyReviewerSubmissions: $onlyReviewerSubmissions) {
            id
            submittedAt
            submittedAgainAt
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
                  notificationEmail
                }
              }
              ... on UserType {
                id
                file
                name
                lastName
                notificationEmail
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
              reviewedAt
              reviewedAgainAt
            }
          }
          nonExistentSubmissions(onlyReviewerSubmissions: $onlyReviewerSubmissions) {
            id
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
                  notificationEmail
                }
              }
              ... on UserType {
                id
                file
                name
                lastName
                notificationEmail
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
