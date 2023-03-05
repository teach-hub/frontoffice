/**
 * @generated SignedSource<<fac80b5db88fca7525926315e1fae7d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserProfileMutation$variables = {
  file: string;
  githubId: string;
  lastName: string;
  name: string;
  notificationEmail: string;
  userId: string;
};
export type UserProfileMutation$data = {
  readonly updateUser: {
    readonly file: string | null;
    readonly githubId: string | null;
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
  "name": "file"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "githubId"
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
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
      },
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
        "variableName": "userId"
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
        "name": "file",
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
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileMutation",
    "selections": (v6/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserProfileMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "77a45837bd1c3636e3ea742a866850ba",
    "id": null,
    "metadata": {},
    "name": "UserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileMutation(\n  $userId: ID!\n  $name: String!\n  $lastName: String!\n  $file: String!\n  $githubId: String!\n  $notificationEmail: String!\n) {\n  updateUser(userId: $userId, name: $name, lastName: $lastName, file: $file, githubId: $githubId, notificationEmail: $notificationEmail) {\n    name\n    lastName\n    file\n    githubId\n    notificationEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "a95f3e0c49efb24ad8a39b22e4456bf0";

export default node;
