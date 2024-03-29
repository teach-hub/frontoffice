import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation LogoutMutation($token: String!) {
    logout(token: $token) {
      token
    }
  }
`;
