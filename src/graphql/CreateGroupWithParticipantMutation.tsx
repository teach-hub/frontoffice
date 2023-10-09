import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateGroupWithParticipantMutation($courseId: ID!, $assignmentId: ID!) {
    createGroupWithParticipant(courseId: $courseId, assignmentId: $assignmentId) {
      id
      viewerGroupParticipants {
        id
        group {
          id
          name
          courseId
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
