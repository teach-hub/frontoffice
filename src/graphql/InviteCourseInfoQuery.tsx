import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query InviteCourseInfoQuery($inviteId: ID!) {
    courseOfInvite(inviteId: $inviteId) {
      id
      name
      name
      period
      year
      subject {
        id
        name
        code
      }
    }
  }
`;
