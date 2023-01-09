/**
 * @generated SignedSource<<c0c370c1875bcb3c5e31e223ab5748a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserProfileMutation$variables = {
  githubId?: string | null;
  id: string;
  lastName?: string | null;
  name?: string | null;
  notificationEmail?: string | null;
};
export type UserProfileMutation$data = {
  readonly updateUser: {
    readonly lastName: string | null;
    readonly name: string | null;
    readonly notificationEmail: string | null;
  } | null;
};
export type UserProfileMutation = {
  response: UserProfileMutation$data;
  variables: UserProfileMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "githubId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "notificationEmail"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "githubId",
        "variableName": "githubId"
      },
      {
        "kind": "Variable",
        "name": "lastName",
        "variableName": "lastName"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "notificationEmail",
        "variableName": "notificationEmail"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUser",
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
        "name": "lastName",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserProfileMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "32417e62e9e66a44624f34425c1bfcd3",
    "id": null,
    "metadata": {},
    "name": "UserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileMutation(\n  $id: ID!\n  $name: String\n  $lastName: String\n  $githubId: String\n  $notificationEmail: String\n) {\n  updateUser(userId: $id, name: $name, lastName: $lastName, githubId: $githubId, notificationEmail: $notificationEmail) {\n    name\n    lastName\n    notificationEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce0c1a8f0d066d3196fc0511ddb44ab5";

export default node;
