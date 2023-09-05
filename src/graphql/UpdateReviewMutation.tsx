import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateReviewMutation(
    $id: ID!
    $courseId: ID!
    $revisionRequested: Boolean!
    $grade: Int
  ) {
    updateReview(
      id: $id
      courseId: $courseId
      revisionRequested: $revisionRequested
      grade: $grade
    ) {
      id
      grade
      revisionRequested
      submissionId
      reviewerId
      reviewedAt
      reviewedAgainAt
    }
  }
`;
