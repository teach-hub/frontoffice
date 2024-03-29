import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateGroupWithParticipantsMutation(
    $courseId: ID!
    $assignmentId: ID!
    $participantUserRoleIds: [ID!]!
  ) {
    createGroupWithParticipants(
      courseId: $courseId
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
