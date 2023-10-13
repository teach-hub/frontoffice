import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AddSubmissionQuery($courseId: ID!) {
    viewer {
      id
      course(id: $courseId) {
        id
        viewerRepositories {
          id
          name
        }
        assignments {
          id
          viewerSubmission {
            id
          }
          viewerReviewer {
            id
            reviewer {
              id
              name
              lastName
            }
          }
          isOpenForSubmissions
          title
          isGroup
        }
        viewerGroupParticipants {
          id
          group {
            id
            name
            assignmentId
          }
        }
      }
      openPullRequests(courseId: $courseId) {
        id
        title
        url
        repositoryName
      }
    }
  }
`;
