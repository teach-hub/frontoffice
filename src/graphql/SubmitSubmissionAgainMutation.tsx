import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation SubmitSubmissionAgainMutation($courseId: ID!, $submissionId: ID!) {
    submitSubmissionAgain(courseId: $courseId, submissionId: $submissionId) {
      success
      errors
    }
  }
`;
