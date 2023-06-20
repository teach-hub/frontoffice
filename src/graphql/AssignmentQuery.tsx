import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: ID!) {
    viewer {
      id
      assignment(id: $id) {
        id
        allowLateSubmissions
        courseId
        description
        endDate
        link
        startDate
        title
        active
      }
    }
  }
`;
