import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateRepositoryMutation(
    $organization: String!
    $courseId: ID!
    $admins: [String!]
    $maintainers: [String!]
    $repositoriesData: [RepositoryStudentData!]
  ) {
    createRepositories(
      organization: $organization
      courseId: $courseId
      admins: $admins
      maintainers: $maintainers
      repositoriesData: $repositoriesData
    ) {
      failedRepositoriesNames
    }
  }
`;
