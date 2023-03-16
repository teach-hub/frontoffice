/**
 * @generated SignedSource<<0301b3cac415b76db86200ea5d891eaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type NavigationQuery$variables = {};
export type NavigationQuery$data = {
  readonly viewer: {
    readonly name: string;
    readonly userId: string;
  } | null;
};
export type NavigationQuery = {
  response: NavigationQuery$data;
  variables: NavigationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewerType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "NavigationQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "da06e026a075b0aacaf12ff53a49b5b1",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery {\n  viewer {\n    userId\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "07cca350ce6ffb5478af6e480dd2c493";

export default node;
