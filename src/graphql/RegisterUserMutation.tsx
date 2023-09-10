import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation RegisterUserMutation(
    $name: String
    $lastName: String
    $file: String
    $notificationEmail: String
  ) {
    registerUser(
      name: $name
      lastName: $lastName
      file: $file
      notificationEmail: $notificationEmail
    ) {
      id
      name
      lastName
      file
    }
  }
`;
