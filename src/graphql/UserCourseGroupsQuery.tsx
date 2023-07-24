import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query UserCourseGroupsQuery($courseId: ID!) {
    viewer {
      id
      course(id: $courseId) {
        id
        assignments {
          id
          title
          isGroup
        }
        viewerGroups {
          id
          assignmentId
          group {
            id
            name
          }
          groupUsers {
            id
            name
            lastName
            notificationEmail
            file
          }
        }
        groups {
          id
          name
        }
      }
    }
  }
`;
