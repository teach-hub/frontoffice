/**
 * @generated SignedSource<<9943c58193f2b510cea6b2e0723033d5>>
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
export type UserProfileQuery = {
  response: UserProfileQuery$data;
  variables: UserProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "surname",
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
    "name": "UserProfileQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserProfileQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9329695d75b1fb42bb0f867ee259ba4e",
    "id": null,
    "metadata": {},
    "name": "UserProfileQuery",
    "operationKind": "query",
    "text": "query UserProfileQuery {\n  viewer {\n    name\n    surname\n  }\n}\n"
  }
};
})();

(node as any).hash = "264b7b7311061608f7f0ed70de300928";

export default node;
