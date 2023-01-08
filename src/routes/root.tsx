import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

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

  const elements = [];

  useEffect(() => {
    fetchQuery<rootQuery>(relayEnv, Query, {})
      .toPromise()
      .then(queryResult => {
        console.log('GraphQL response');
        console.log(queryResult);
        setAppVersion(queryResult);
      });
  }, [relayEnv]);

  return (
    <div>
      <h1>Aca empieza</h1>
      <h1>Hey! Welcome to TeachHub!</h1>
      {elements}
      <button onClick={() => navigate('/falopa')}> Click me to go over another page </button>
    </div>
  );
};

export default Root;
