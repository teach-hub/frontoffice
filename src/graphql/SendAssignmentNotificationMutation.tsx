import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation SendAssignmentNotificationMutation(
    $recipients: [String!]!
    $body: String!
    $assignmentId: ID!
    $courseId: ID!
  ) {
    sendNotification(
      recipients: $recipients
      body: $body
      assignmentId: $assignmentId
      courseId: $courseId
    )
  }
`;
