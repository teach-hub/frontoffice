import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CommitReviewersMutation(
    $input: AssignReviewersInputType!
    $courseId: ID!
    $filters: PreviewReviewersFilterInputType!
  ) {
    assignReviewers(input: $input, courseId: $courseId) {
      id
      # Necesario para actualizar el store con los nuevos reviewers.
      previewReviewers(input: $filters) {
        id
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
    }
  }
`;
