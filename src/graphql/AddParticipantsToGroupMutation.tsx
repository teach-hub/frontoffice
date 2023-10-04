import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation AddParticipantsToGroupMutation(
    $courseId: ID!
    $groupId: ID!
    $assignmentId: ID!
    $participantUserRoleIds: [ID!]!
  ) {
    addParticipantsToGroup(
      courseId: $courseId
      groupId: $groupId
      assignmentId: $assignmentId
      participantUserRoleIds: $participantUserRoleIds
    ) {
      id
      groupParticipants {
        id
        group {
          id
          name
        }
        userRoleId
        user {
          id
          name
          lastName
          file
        }
      }
    }
  }
`;
