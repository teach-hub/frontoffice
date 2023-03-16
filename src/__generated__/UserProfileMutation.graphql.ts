/**
 * @generated SignedSource<<1c4eaa77cfdf74e8a4977512ea9600e9>>
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "githubId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notificationEmail",
  "storageKey": null
};
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
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ],
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
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9e267e3575d0e49e269d24e1b4d5280",
    "id": null,
    "metadata": {},
    "name": "UserProfileMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileMutation(\n  $userId: ID!\n  $name: String!\n  $lastName: String!\n  $file: String!\n  $githubId: String!\n  $notificationEmail: String!\n) {\n  updateUser(userId: $userId, name: $name, lastName: $lastName, file: $file, githubId: $githubId, notificationEmail: $notificationEmail) {\n    name\n    lastName\n    file\n    githubId\n    notificationEmail\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a95f3e0c49efb24ad8a39b22e4456bf0";

export default node;
