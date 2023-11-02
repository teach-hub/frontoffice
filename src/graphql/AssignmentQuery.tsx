import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: ID!, $courseId: ID!, $includeSubmissions: Boolean!) {
    viewer {
      id
      course(id: $courseId) {
        id
        assignment(id: $id) {
          id
          viewerSubmission {
            id
          }
          allowLateSubmissions
          isOpenForSubmissions
          title
          description
          link
          startDate
          endDate
          isGroup
          submissions(onlyReviewerSubmissions: false) @include(if: $includeSubmissions) {
            id
            review {
              id
              revisionRequested
              grade
            }
            reviewer {
              id
              reviewer {
                id
                name
                lastName
              }
            }
          }
          nonExistentSubmissions(onlyReviewerSubmissions: false)
            @include(if: $includeSubmissions) {
            id
            reviewer {
              id
              reviewer {
                id
                name
                lastName
              }
            }
          }
        }
      }
    }
  }
`;
