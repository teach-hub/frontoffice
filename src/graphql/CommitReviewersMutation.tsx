import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CommitReviewersMutation($input: AssignReviewersInputType!, $courseId: ID!) {
    assignReviewers(input: $input, courseId: $courseId) {
      id
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
