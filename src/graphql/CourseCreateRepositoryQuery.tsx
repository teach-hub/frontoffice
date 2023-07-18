import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseCreateRepositoryQuery($courseId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        name
        organization
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
            permissions
            isTeacher
          }
        }
        groups {
          id
          name
          usersByAssignments {
            assignments {
              id
              title
            }
            users {
              id
              name
              lastName
              notificationEmail
              file
            }
          }
        }
      }
    }
  }
`;
