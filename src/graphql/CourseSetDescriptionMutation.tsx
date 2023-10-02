import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CourseSetDescriptionMutation($description: String!, $courseId: ID!) {
    setDescription(description: $description, courseId: $courseId) {
      id
      description
    }
  }
`;
