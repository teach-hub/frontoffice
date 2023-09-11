export const isAuthenticated = (token: string | null) => {
  // TODO: TH-70 Improve is authenticated check
  return token !== null;
};
