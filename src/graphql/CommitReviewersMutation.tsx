import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CommitReviewersMutation($input: AssignReviewersInputType!) {
    assignReviewers(input: $input) {
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
  }
`;
