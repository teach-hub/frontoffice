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
          }
        }
      }
    }
  }
`;
