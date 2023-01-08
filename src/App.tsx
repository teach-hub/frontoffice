import { RelayEnvironmentProvider } from 'react-relay';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import environment from './relayEnvironment';

import Root from './routes/root';
import NotFoundRoute from './routes/notFound';
import UserProfilePage from './pages/UserProfile';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Navigation>
      <Routes>
        <Route path="/">
          <Route index element={<Root />} />

          {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Route>
      </Routes>
    </Navigation>
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
