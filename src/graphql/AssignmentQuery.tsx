import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($courseId: String!, $assignmentId: String!) {
    viewer {
      id
      name
      findCourse(id: $courseId) {
        id
        findAssignment(id: $assignmentId) {
          id
          title
          startDate
          endDate
          link
        }
      }
    }
  }
`;
