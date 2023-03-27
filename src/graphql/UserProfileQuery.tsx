import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query UserProfileQuery {
    viewer {
      id
      name
      lastName
      githubId
      file
      notificationEmail
    }
  }
`;
