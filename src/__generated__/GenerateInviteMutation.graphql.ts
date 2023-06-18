/**
 * @generated SignedSource<<780450a30635b8ba3555a559b28f9a70>>
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
    "cacheID": "66e02c5ba2e03988254adae61d890c82",
    "id": null,
    "metadata": {},
    "name": "GenerateInviteMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateInviteMutation(\n  $courseId: ID!\n  $roleId: ID!\n) {\n  generateInviteCode(roleId: $roleId, courseId: $courseId)\n}\n"
  }
};
})();

(node as any).hash = "820abe75950fda4c5e9a96e33c91f29a";

export default node;
