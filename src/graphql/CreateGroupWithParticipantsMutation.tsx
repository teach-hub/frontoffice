import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateGroupWithParticipantsMutation(
    $groupName: String!
    $courseId: ID!
    $assignmentId: ID!
    $participantUserRoleIds: [ID!]!
  ) {
    createGroupWithParticipants(
      groupName: $groupName
      courseId: $courseId
      assignmentId: $assignmentId
      participantUserRoleIds: $participantUserRoleIds
    ) {
      id
      assignmentId
    }
  }
`;
