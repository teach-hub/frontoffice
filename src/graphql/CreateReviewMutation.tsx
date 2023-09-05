import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateReviewMutation(
    $submissionId: ID!
    $courseId: ID!
    $revisionRequested: Boolean!
    $grade: Int
  ) {
    createReview(
      submissionId: $submissionId
      courseId: $courseId
      revisionRequested: $revisionRequested
      grade: $grade
    ) {
      id
      review {
        id
        grade
        revisionRequested
        submissionId
        reviewerId
        reviewedAt
        reviewedAgainAt
      }
    }
  }
`;
