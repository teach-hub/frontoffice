/**
 * @generated SignedSource<<97e9bd33e6c8e80b672d99913ae71628>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type rootQuery$variables = {};
export type rootQuery$data = { readonly app: { readonly version: string | null; } | null;
};
export type rootQuery = {
  response: rootQuery$data;
  variables: rootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AppType",
    "kind": "LinkedField",
    "name": "app",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "version",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "rootQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "rootQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3e30f938f14f9720152c21396e72739a",
    "id": null,
    "metadata": {},
    "name": "rootQuery",
    "operationKind": "query",
    "text": "query rootQuery {\n  app {\n    version\n  }\n}\n"
  }
};
})();

(node as any).hash = "d90e3eb3150f2a5d3a0a85c7d6ea7e17";

export default node;
