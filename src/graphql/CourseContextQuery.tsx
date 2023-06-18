import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseContextQuery($courseId: String!) {
    viewer {
      id
      course(id: $courseId) {
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
