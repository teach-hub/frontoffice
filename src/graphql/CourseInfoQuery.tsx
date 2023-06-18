import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query CourseInfoQuery($courseId: String!) {
    viewer {
      id
      name
      course(id: $courseId) {
        id
        name
        organization
        studentsCount
        teachersCount
        assignments {
          id
        }
        subject {
          id
          name
        }
      }
      availableOrganizations {
        names
      }
    }
  }
`;
