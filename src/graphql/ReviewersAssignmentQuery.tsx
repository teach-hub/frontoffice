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
          isGroup
          title
          groupParticipants {
            id
            user {
              name
              lastName
            }
            groupId
          }
          reviewers {
            id
            reviewer {
              id
              name
              lastName
            }
            reviewee {
              __typename
              ... on InternalGroupType {
                id
                groupName: name
              }
              ... on UserType {
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
              __typename
              ... on InternalGroupType {
                id
                groupName: name
              }
              ... on UserType {
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
