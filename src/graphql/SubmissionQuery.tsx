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
            user {
              id
              file
              name
              lastName
            }
            reviewer {
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
