import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation UpdateAssignmentMutation(
    $id: ID!
    $title: String
    $description: String
    $startDate: String
    $endDate: String
    $link: String
    $allowLateSubmissions: Boolean
    $active: Boolean
    $courseId: ID!
  ) {
    updateAssignment(
      id: $id
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      link: $link
      allowLateSubmissions: $allowLateSubmissions
      active: $active
      courseId: $courseId
    ) {
      id
      title
      description
      startDate
      endDate
      link
      allowLateSubmissions
      courseId
      active
    }
  }
`;
