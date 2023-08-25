import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation AddParticipantsToGroupMutation(
    $groupId: ID!
    $assignmentId: ID!
    $participantUserRoleIds: [ID!]!
  ) {
    addParticipantsToGroup(
      groupId: $groupId
      assignmentId: $assignmentId
      participantUserRoleIds: $participantUserRoleIds
    ) {
      id
      assignmentId
    }
  }
`;
