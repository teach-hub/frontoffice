/**
 * Returns the repo url from a pull request url,
 * which is the url prior to the /pull/ part.
 * */
export const getGithubRepoUrlFromPullRequestUrl = (url: string): string =>
  url.split('/pull')[0];
