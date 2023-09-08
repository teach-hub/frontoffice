import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateSubmissionMutation(
    $courseId: ID!
    $assignmentId: ID!
    $pullRequestUrl: String!
  ) {
    createSubmission(
      courseId: $courseId
      assignmentId: $assignmentId
      pullRequestUrl: $pullRequestUrl
    ) {
      id
      submittedAt
      submittedAgainAt
    }
  }
`;
