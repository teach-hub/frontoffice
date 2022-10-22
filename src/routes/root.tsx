import { useEffect } from 'react';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro'

const Query = graphql`
  query rootQuery {
    app {
      version
    }
  }
`;

const Root = () => {

  const relayEnv = useRelayEnvironment();

  useEffect(() => {
    fetchQuery(relayEnv, Query, {})
      .toPromise()
      .then(queryResult => {
        console.log('GraphQL response');
        console.log(queryResult);
      }
    );
  }, [relayEnv])

  return (
    <div>
      <h1>Hey! Welcome to TeachHub!</h1>
    </div>
  );
}

export default Root;
