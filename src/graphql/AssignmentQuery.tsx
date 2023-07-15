import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: ID!, $courseId: ID!) {
    viewer {
      id
      course(id: $courseId) {
        id
        assignment(id: $id) {
          allowLateSubmissions
          courseId
          description
          endDate
          id
          link
          startDate
          title
          active
          isGroup
        }
      }
    }
  }
`;
