import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateProfileMutation(
    $name: String!
    $lastName: String!
    $file: String!
    $githubId: String!
    $notificationEmail: String!
  ) {
    updateViewerUser(
      name: $name
      lastName: $lastName
      file: $file
      githubId: $githubId
      notificationEmail: $notificationEmail
    ) {
      id
      name
      lastName
      file
      githubId
      githubUserName
      notificationEmail
    }
  }
`;
