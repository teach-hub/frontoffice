/**
 * @generated SignedSource<<f1e5a9e91ef364a8c4fdacb3315d05d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateInviteMutation$variables = {
  courseId: string;
  roleId: string;
};
export type GenerateInviteMutation$data = {
  readonly generateInviteCode: string;
};
export type GenerateInviteMutation = {
  response: GenerateInviteMutation$data;
  variables: GenerateInviteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "courseId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "roleId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "roleId",
        "variableName": "roleId"
      }
    ],
    "kind": "ScalarField",
    "name": "generateInviteCode",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GenerateInviteMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GenerateInviteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ba2943db3de9c79723df4b51285a5771",
    "id": null,
    "metadata": {},
    "name": "GenerateInviteMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateInviteMutation(\n  $courseId: String!\n  $roleId: String!\n) {\n  generateInviteCode(roleId: $roleId, courseId: $courseId)\n}\n"
  }
};
})();

(node as any).hash = "ff6ba2575dc04bbf690b6c21400f6a88";

export default node;
