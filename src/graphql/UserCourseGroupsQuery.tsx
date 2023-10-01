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
        viewerGroupParticipants {
          id
          group {
            id
            name
            assignmentId
            members {
              id
              name
              lastName
              notificationEmail
              file
            }
          }
        }
        groups {
          id
          name
          assignmentId
        }
      }
    }
  }
`;
