import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CommitReviewersMutation($input: AssignReviewersInputType!) {
    assignReviewers(input: $input) {
      reviewer {
        id
      }
      reviewee {
        id
      }
    }
  }
`;
