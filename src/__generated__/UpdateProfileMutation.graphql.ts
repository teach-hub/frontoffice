/**
 * @generated SignedSource<<ed17a35738a2a685967126fcda61faf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateProfileMutation$variables = {
  file: string;
  githubId: string;
  lastName: string;
  name: string;
  notificationEmail: string;
};
export type UpdateProfileMutation$data = {
  readonly updateViewerUser: {
    readonly file: string;
    readonly githubId: string;
    readonly githubUserName: string;
    readonly id: string;
    readonly lastName: string;
    readonly name: string;
    readonly notificationEmail: string;
  } | null;
};
export type UpdateProfileMutation = {
  response: UpdateProfileMutation$data;
  variables: UpdateProfileMutation$variables;
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
v5 = [
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
      }
    ],
    "concreteType": "UserType",
    "kind": "LinkedField",
    "name": "updateViewerUser",
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
        "name": "githubUserName",
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
    "name": "UpdateProfileMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateProfileMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "b7af108e3ce9ee70c5a6ab33e3b7c955",
    "id": null,
    "metadata": {},
    "name": "UpdateProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateProfileMutation(\n  $name: String!\n  $lastName: String!\n  $file: String!\n  $githubId: String!\n  $notificationEmail: String!\n) {\n  updateViewerUser(name: $name, lastName: $lastName, file: $file, githubId: $githubId, notificationEmail: $notificationEmail) {\n    id\n    name\n    lastName\n    file\n    githubId\n    githubUserName\n    notificationEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "f778bdece67b910aa56d7d5992917b11";

export default node;
