/**
 * @generated SignedSource<<43447d014c6d83ae265e58e75c63f846>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserProfileQuery$variables = {};
export type UserProfileQuery$data = {
  readonly viewer: {
    readonly file: string;
    readonly githubId: string;
    readonly id: string;
    readonly lastName: string;
    readonly name: string;
    readonly notificationEmail: string;
  } | null;
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
    "concreteType": "ViewerType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "githubId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "file",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "notificationEmail",
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
    "cacheID": "0c8ab1c402ca514bb88ffd827a5d57e2",
    "id": null,
    "metadata": {},
    "name": "UserProfileQuery",
    "operationKind": "query",
    "text": "query UserProfileQuery {\n  viewer {\n    id\n    name\n    lastName\n    githubId\n    file\n    notificationEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "562de079d471216af1e5aa8056625876";

export default node;
