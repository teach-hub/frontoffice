import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseInfoQuery($courseId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        name
        organization
        studentsCount
        teachersCount
        assignments {
          id
          title
          isGroup
          submissions {
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
          nonExistentSubmissions {
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
