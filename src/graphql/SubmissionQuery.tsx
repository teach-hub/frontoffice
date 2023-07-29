import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query SubmissionQuery($courseId: ID!, $assignmentId: ID!, $submissionId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        assignment(id: $assignmentId) {
          id
          title
          endDate
          submission(id: $submissionId) {
            id
            description
            submittedAt
            pullRequestUrl
            reviewEnabledForViewer
            submitter {
              ... on UserType {
                id
                file
                name
                lastName
              }
            }
            reviewer {
              id
              reviewer {
                id
                name
                lastName
              }
            }
            review {
              id
              revisionRequested
              grade
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
