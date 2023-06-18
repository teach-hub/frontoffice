import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation GenerateInviteMutation($courseId: ID!, $roleId: ID!) {
    generateInviteCode(roleId: $roleId, courseId: $courseId)
  }
`;
