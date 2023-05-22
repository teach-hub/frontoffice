import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseContextQuery($courseId: String!) {
    viewer {
      id
      findCourse(id: $courseId) {
        id
        viewerRole {
          id
          name
          permissions
          isTeacher
        }
      }
    }
  }
`;
