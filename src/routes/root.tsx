import { useEffect, useState } from 'react';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro'

import { rootQuery, rootQuery$data } from '__generated__/rootQuery.graphql';

const Query = graphql`
  query rootQuery {
    app {
      version
    }
  }
`;

const Root = () => {

  const relayEnv = useRelayEnvironment();

  const [appVersion, setAppVersion] = useState<rootQuery$data | undefined>();

  useEffect(() => {
    fetchQuery<rootQuery>(relayEnv, Query, {})
      .toPromise()
      .then(queryResult => {
        console.log('GraphQL response');
        console.log(queryResult);
        setAppVersion(queryResult)
      }
    );
  }, [relayEnv])

  return (
    <div>
      <h1>Hey! Welcome to TeachHub!</h1>
      <h1>Current version: {appVersion?.app?.version}</h1>
    </div>
  );
}

export default Root;
