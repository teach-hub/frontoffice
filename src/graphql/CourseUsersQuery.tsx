import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseUsersQuery($courseId: String!) {
    viewer {
      id
      name
      findCourse(id: $courseId) {
        id
        name
        userRoles {
          id
          user {
            id
            name
            lastName
            file
            notificationEmail
          }
          role {
            id
            name
            isTeacher
            permissions
          }
        }
      }
    }
  }
`;
