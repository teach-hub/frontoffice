/**
 * @generated SignedSource<<9e1d3b01eb3bdb042213a0ced3b87ce6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationQuery$variables = {};
export type NavigationQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly lastName: string;
    readonly name: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"AvailableRolesFragment">;
};
export type NavigationQuery = {
  response: NavigationQuery$data;
  variables: NavigationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "ViewerType",
  "kind": "LinkedField",
  "name": "viewer",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationQuery",
    "selections": [
      (v2/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AvailableRolesFragment"
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NavigationQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "RoleType",
        "kind": "LinkedField",
        "name": "availableRoles",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b343683e7d54a195d426e446fba63fee",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery {\n  viewer {\n    id\n    name\n    lastName\n  }\n  ...AvailableRolesFragment\n}\n\nfragment AvailableRolesFragment on RootQueryType {\n  availableRoles {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e546e6972a8586942e6fc7f30d9a965";

export default node;
