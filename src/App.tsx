import { RelayEnvironmentProvider } from 'react-relay';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from './relayEnvironment';

import Root from './routes/root';
import NotFoundRoute from './routes/notFound';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Root />} />

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        <Route path="*" element={<NotFoundRoute />} />
      </Route>
    </Routes>
  );
};

const AppRoot = () => (
  <ChakraProvider>
    <RelayEnvironmentProvider environment={environment}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RelayEnvironmentProvider>
  </ChakraProvider>
);

export default AppRoot;
