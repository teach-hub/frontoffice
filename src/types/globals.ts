export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      REACT_APP_GITHUB_CLIENT_ID: string;
      REACT_APP_GITHUB_CLIENT_SCOPE: string;
      REACT_APP_BACKEND_URL: string;
    };
  }
}
