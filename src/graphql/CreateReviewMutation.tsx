import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateReviewMutation(
    $submissionId: ID!
    $revisionRequested: Boolean!
    $grade: Int
  ) {
    createReview(
      submissionId: $submissionId
      revisionRequested: $revisionRequested
      grade: $grade
    ) {
      id
      grade
      revisionRequested
      submissionId
      reviewerId
    }
  }
`;
