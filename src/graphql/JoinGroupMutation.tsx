import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation JoinGroupMutation($groupId: ID!, $courseId: ID!, $assignmentId: ID!) {
    joinGroup(groupId: $groupId, courseId: $courseId, assignmentId: $assignmentId) {
      id
      viewerGroupParticipants {
        id
        group {
          id
          name
          assignmentId
          members {
            id
            name
            lastName
            notificationEmail
            file
          }
        }
      }
    }
  }
`;
