import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: ID!, $courseId: ID!, $includeViewerSubmissions: Boolean!) {
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
          viewerSubmission @include(if: $includeViewerSubmissions) {
            id
          }
        }
      }
    }
  }
`;
