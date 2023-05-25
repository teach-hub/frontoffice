import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CourseSetOrganizationMutation($organizationName: String!, $courseId: String!) {
    setOrganization(organizationName: $organizationName, courseId: $courseId) {
      id
      organization
    }
  }
`;
