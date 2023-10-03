import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseInfoQuery($courseId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        name
        description
        organization
        studentsCount
        teachersCount
        year
        period
        assignments {
          id
          title
          isGroup
          submissions(onlyReviewerSubmissions: false) {
            id
            submittedAt
            pullRequestUrl
            assignmentId
            review {
              id
              revisionRequested
              grade
            }
          }
          nonExistentSubmissions(onlyReviewerSubmissions: false) {
            id
          }
        }
        subject {
          id
          name
        }
      }
      availableOrganizations {
        names
      }
    }
  }
`;
