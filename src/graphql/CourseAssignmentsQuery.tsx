import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseAssignmentsQuery($courseId: String!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignments {
          id
          title
          endDate
        }
      }
    }
  }
`;
