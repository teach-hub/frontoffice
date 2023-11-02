import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentUpdateQuery($id: ID!, $courseId: ID!) {
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
        }
      }
    }
  }
`;
