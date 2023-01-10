/**
 * @generated SignedSource<<8a3a15415f0bb172f5bb6cceab48aebd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserProfileMutation$variables = {
  file?: string | null;
  githubId?: string | null;
  id: string;
  lastName?: string | null;
  name?: string | null;
  notificationEmail?: string | null;
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
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lastName"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "notificationEmail"
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
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserProfileMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "9f37c433c8afd3e1537477674e5ac1ca",
    "id": null,
    "metadata": {},
    "name": "UserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileMutation(\n  $id: ID!\n  $name: String\n  $lastName: String\n  $file: String\n  $githubId: String\n  $notificationEmail: String\n) {\n  updateUser(userId: $id, file: $file, name: $name, lastName: $lastName, githubId: $githubId, notificationEmail: $notificationEmail) {\n    name\n    lastName\n    file\n    githubId\n    notificationEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "cfc5fef6894ed8185054f8bd394e448e";

export default node;
