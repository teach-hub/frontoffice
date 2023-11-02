import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateAssignmentMutation(
    $title: String!
    $description: String
    $startDate: String
    $endDate: String
    $link: String
    $allowLateSubmissions: Boolean
    $isGroup: Boolean
    $courseId: ID!
  ) {
    createAssignment(
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      link: $link
      allowLateSubmissions: $allowLateSubmissions
      courseId: $courseId
      isGroup: $isGroup
    ) {
      id
      title
      description
      startDate
      endDate
      link
      allowLateSubmissions
      courseId
      isGroup
    }
  }
`;
