import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseUsersQuery($courseId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
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
