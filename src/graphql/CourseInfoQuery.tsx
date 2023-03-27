
import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseInfoQuery ($courseId: String!) {
    viewer {
      id
      name
      findCourse(id: $courseId) {
        ...courseInfo
      }
    }
  }
`;

