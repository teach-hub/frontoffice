/**
 * @generated SignedSource<<b0b4b7d112049b2fc13c7f18237f9863>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppVersionQuery$variables = {};
export type AppVersionQuery$data = {
  readonly app: {
    readonly version: string | null;
  } | null;
};
export type AppVersionQuery = {
  response: AppVersionQuery$data;
  variables: AppVersionQuery$variables;
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
    "name": "AppVersionQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppVersionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "3c538206d5da70d249495a4e0dbc4fe0",
    "id": null,
    "metadata": {},
    "name": "AppVersionQuery",
    "operationKind": "query",
    "text": "query AppVersionQuery {\n  app {\n    version\n  }\n}\n"
  }
};
})();

(node as any).hash = "7a0487e8b7dc26cf5029ca72375d4891";

export default node;
