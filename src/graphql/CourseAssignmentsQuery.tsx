import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseAssignmentsQuery($courseId: ID!, $includeViewerSubmissions: Boolean!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignments {
          id
          title
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
