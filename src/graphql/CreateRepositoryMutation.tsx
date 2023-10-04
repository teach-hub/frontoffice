import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  mutation CreateRepositoryMutation(
    $organization: String!
    $courseId: ID!
    $admins: [String!]
    $maintainers: [String!]
    $repositoriesData: [RepositoryStudentData!]
    $arePrivate: Boolean!
    $baseRepositoryData: BaseRepositoryData
  ) {
    createRepositories(
      organization: $organization
      courseId: $courseId
      admins: $admins
      maintainers: $maintainers
      repositoriesData: $repositoriesData
      arePrivate: $arePrivate
      baseRepositoryData: $baseRepositoryData
    ) {
      failedRepositoriesNames
    }
  }
`;
