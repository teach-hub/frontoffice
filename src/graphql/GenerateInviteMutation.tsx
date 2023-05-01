import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation GenerateInviteMutation($courseId: String!, $roleId: String!) {
    generateInviteCode(roleId: $roleId, courseId: $courseId)
  }
`;
