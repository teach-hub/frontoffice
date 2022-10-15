import { useEffect } from 'react';
import { graphql } from 'babel-plugin-relay/macro'
import { fetchQuery, RelayEnvironmentProvider} from 'react-relay';

import environment from './relayEnvironment';

import logo from './logo.svg';
import './App.css';


const AppVersionQuery = graphql`
  query AppQuery {
    app {
      version
    }
  }
`;


const App = ({ environment }: { environment: any }) => {

  useEffect(() => {
    fetchQuery(environment, AppVersionQuery, {})
      .toPromise()
      .then(queryResult => {
        console.log('GraphQL response');
        console.log(queryResult);
      }
    );
  }, [environment])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey there, you're using TeachHub
        </p>
      </header>
    </div>
  );
}


const AppRoot = (props: any) => {

  return (
    <RelayEnvironmentProvider environment={environment}>
      <App environment={environment} />
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
