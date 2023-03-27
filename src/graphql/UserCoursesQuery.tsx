import { graphql } from 'babel-plugin-relay/macro';

export default graphql`
  query UserCoursesQuery {
    viewer {
      id
      userRoles {
        id
        course {
          id
          name
          year
          period
          subject {
            id
            code
            active
            name
          }
        }
        role {
          id
          name
          permissions
        }
      }
    }
  }
`;
