import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query AssignmentQuery($id: String!) {
    findAssignment(id: $id) {
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
