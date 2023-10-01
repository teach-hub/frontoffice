import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateGroupWithParticipantMutation(
    $groupName: String!
    $courseId: ID!
    $assignmentId: ID!
  ) {
    createGroupWithParticipant(
      groupName: $groupName
      courseId: $courseId
      assignmentId: $assignmentId
    ) {
      id
      group {
        id
        name
        courseId
      }
    }
  }
`;
