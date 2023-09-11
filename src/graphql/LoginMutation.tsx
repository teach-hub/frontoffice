import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation LoginMutation($code: String!) {
    login(code: $code) {
      token
      shouldPerformRegistration
    }
  }
`;
