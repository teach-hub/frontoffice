/**
 * @generated SignedSource<<33dd5732bbc71d912dc14d41814a242b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RegisterUserMutation$variables = {
  file?: string | null;
  lastName?: string | null;
  name?: string | null;
  notificationEmail?: string | null;
};
export type RegisterUserMutation$data = {
  readonly registerUser: {
    readonly token: string | null;
  } | null;
};
export type RegisterUserMutation = {
  response: RegisterUserMutation$data;
  variables: RegisterUserMutation$variables;
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
  "name": "lastName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "notificationEmail"
},
v4 = [
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
    "concreteType": "RegisterType",
    "kind": "LinkedField",
    "name": "registerUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterUserMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "RegisterUserMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "a813a8474f7a9503a4bb7aa31c533221",
    "id": null,
    "metadata": {},
    "name": "RegisterUserMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterUserMutation(\n  $name: String\n  $lastName: String\n  $file: String\n  $notificationEmail: String\n) {\n  registerUser(name: $name, lastName: $lastName, file: $file, notificationEmail: $notificationEmail) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "2fccae2336fec03819563b01685848e5";

export default node;
