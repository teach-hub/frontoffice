import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentGroupsAndUsersQuery($courseId: ID!, $assignmentId: ID) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
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
        assignments(assignmentId: $assignmentId) {
          id
          title
          isGroup
          groupParticipants {
            id
            group {
              id
              name
            }
            userRoleId
            user {
              id
              name
              lastName
              file
            }
          }
        }
      }
    }
  }
`;
