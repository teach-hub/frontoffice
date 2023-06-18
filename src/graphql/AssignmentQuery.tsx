import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: String!) {
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
    }
  }
`;
