import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: ID!, $courseId: ID!, $includeViewerSubmissions: Boolean!) {
    viewer {
      id
      course(id: $courseId) {
        id
        assignment(id: $id) {
          id
          allowLateSubmissions
          courseId
          isOpenForSubmissions
          viewerAlreadyMadeSubmission
          description
          endDate
          link
          startDate
          title
          active
          isGroup
          viewerSubmission @include(if: $includeViewerSubmissions) {
            id
          }
        }
      }
    }
  }
`;
