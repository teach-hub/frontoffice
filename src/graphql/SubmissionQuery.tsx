import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query SubmissionQuery($courseId: ID!, $submissionId: ID!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        submission(id: $submissionId) {
          id
          description
          submittedAt
          pullRequestUrl
          viewerCanReview
          submitter {
            ... on UserType {
              id
              file
              name
              lastName
            }
            ... on InternalGroupType {
              id
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
          assignment {
            id
            title
            endDate
            groupParticipants {
              group {
                id
                name
              }
              groupUsers {
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
