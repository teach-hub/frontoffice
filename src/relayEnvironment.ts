import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { storeSetValue, storeGetValue } from 'hooks/useLocalStorage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

const fetchQuery = async (operation: { text: string | null }, variables: unknown) => {
  const url = `${BACKEND_URL}/graphql`;

  const body = JSON.stringify({
    query: operation.text,
    variables,
  });

  console.log('Fetching', { url, body });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };

  const token = storeGetValue('token')
    ? JSON.parse(storeGetValue('token') as string)
    : null;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, { method: 'POST', body, headers }).then(response => response.json());
};

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);

export default new Environment({ network, store });
