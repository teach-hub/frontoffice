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
        assignments {
          id
          title
        }
        groupParticipants {
          id
          assignmentId
          userRoleId
          group {
            id
            name
          }
          otherParticipants {
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
`;
