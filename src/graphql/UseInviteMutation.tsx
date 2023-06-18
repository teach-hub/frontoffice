import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation UseInviteMutation($inviteId: ID!) {
    useInvite(inviteId: $inviteId) {
      courseId
    }
  }
`;
