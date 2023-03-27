import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateProfileMutation (
    $id: String!,
    $name: String!,
    $lastName: String!,
    $file: String!,
    $githubId: String!,
    $notificationEmail: String!
  ) {
    updateUser(
      userId: $id,
      name: $name,
      lastName: $lastName,
      file: $file,
      githubId: $githubId,
      notificationEmail: $notificationEmail
    ) {
      id
      name
      lastName
      file
      githubId
      notificationEmail
    }
  }
`;
