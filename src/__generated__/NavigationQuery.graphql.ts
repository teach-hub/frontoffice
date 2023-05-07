/**
 * @generated SignedSource<<9993a67be7d82ec119451f1bea2ddeff>>
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
    readonly name: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"AvailableRolesFragment">;
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
    "kind": "ScalarField",
    "name": "id",
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
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "ViewerType",
  "kind": "LinkedField",
  "name": "viewer",
  "plural": false,
  "selections": (v0/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationQuery",
    "selections": [
      (v1/*: any*/),
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
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "RoleType",
        "kind": "LinkedField",
        "name": "availableRoles",
        "plural": true,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5068afd55d73c34c5d24fd9e42ee6e95",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery {\n  viewer {\n    id\n    name\n  }\n  ...AvailableRolesFragment\n}\n\nfragment AvailableRolesFragment on RootQueryType {\n  availableRoles {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "d815b4071368b219544f791a788f9c82";

export default node;
