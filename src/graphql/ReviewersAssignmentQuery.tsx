import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query ReviewersAssignmentQuery(
    $courseId: ID!
    $assignmentId: ID!
    $filters: PreviewReviewersFilterInputType!
  ) {
    viewer {
      id
      course(id: $courseId) {
        id
        teachersUserRoles {
          id
          user {
            id
            name
            lastName
          }
        }
        assignment(id: $assignmentId) {
          id
          reviewers {
            id
            reviewer {
              id
              name
              lastName
            }
            reviewee {
              ... on UserType {
                __typename
                id
                name
                lastName
                file
              }
            }
          }
          previewReviewers(input: $filters) {
            id
            reviewee {
              ... on UserType {
                __typename
                id
                name
                lastName
                file
              }
            }
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
`;
