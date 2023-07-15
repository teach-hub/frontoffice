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
        }
        viewerGroups {
          id
          assignmentId
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
        groups {
          id
          name
        }
      }
    }
  }
`;
