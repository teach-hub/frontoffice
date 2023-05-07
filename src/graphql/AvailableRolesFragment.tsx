import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  fragment AvailableRolesFragment on RootQueryType {
    availableRoles {
      id
      name
    }
  }
`;
