import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = async (
  operation: any,
  variables: any,
) => {

  const url = 'http://localhost:3000/graphql';

  const body = JSON.stringify({
    query: operation.text,
    variables
  })

  console.log('Fetching', { url, body })

  return fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
  }).then(response => {
    return response.json();
  });
}


const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);

export default new Environment({ network, store });


