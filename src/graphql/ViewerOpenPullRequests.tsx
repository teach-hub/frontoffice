import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query ViewerOpenPullRequestsQuery($courseId: ID!) {
    viewer {
      id
      course(id: $courseId) {
        id
        assignments {
          id
          title
        }
      }
      repositories(courseId: $courseId) {
        id
        name
      }
      openPullRequests(courseId: $courseId) {
        id
        title
        url
        repositoryName
      }
    }
  }
`;
