import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateGroupWithParticipantMutation($courseId: ID!, $assignmentId: ID!) {
    createGroupWithParticipant(courseId: $courseId, assignmentId: $assignmentId) {
      id
      group {
        id
        name
        courseId
      }
    }
  }
`;
