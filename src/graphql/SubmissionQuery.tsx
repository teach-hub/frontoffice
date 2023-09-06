import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query SubmissionQuery($courseId: ID!, $submissionId: ID!) {
    viewer {
      id
      name
      githubId
      course(id: $courseId) {
        id
        submission(id: $submissionId) {
          id
          description
          submittedAt
          submittedAgainAt
          pullRequestUrl
          viewerIsReviewer: viewerCanReview
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
            reviewedAt
            reviewedAgainAt
          }
          assignment {
            id
            title
            endDate
            isGroup
            groupParticipants {
              group {
                id
                name
              }
              user {
                id
                name
                lastName
              }
            }
          }
          comments {
            id
            body
            createdAt
            updatedAt
            githubUserId
            githubUsername
          }
        }
      }
    }
  }
`;
