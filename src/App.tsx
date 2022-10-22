import { useEffect } from 'react';
import { graphql } from 'babel-plugin-relay/macro'
import { fetchQuery, RelayEnvironmentProvider} from 'react-relay';
import { ChakraProvider } from '@chakra-ui/react'

import environment from './relayEnvironment';

import Box from './components/Box';
import Heading from './components/Heading';

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
    <>
      <Heading mb={4} size="xl">TeachHub</Heading>
    </>
  );
}


const AppRoot = () => {
  return (
    <ChakraProvider>
      <RelayEnvironmentProvider environment={environment}>
        <App environment={environment} />
      </RelayEnvironmentProvider>
    </ChakraProvider>
  );
}

export default AppRoot;
