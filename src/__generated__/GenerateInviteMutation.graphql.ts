/**
 * @generated SignedSource<<5b33aeb848801881fe80fa896e17dbd1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateInviteMutation$variables = {
  courseId: string;
  expirationMinutes?: number | null;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "expirationMinutes"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "roleId"
},
v3 = [
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
        "name": "expirationMinutes",
        "variableName": "expirationMinutes"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GenerateInviteMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "GenerateInviteMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0e3288563aad5bb30f49383208d9358a",
    "id": null,
    "metadata": {},
    "name": "GenerateInviteMutation",
    "operationKind": "mutation",
    "text": "mutation GenerateInviteMutation(\n  $courseId: ID!\n  $roleId: ID!\n  $expirationMinutes: Int\n) {\n  generateInviteCode(roleId: $roleId, courseId: $courseId, expirationMinutes: $expirationMinutes)\n}\n"
  }
};
})();

(node as any).hash = "4245cc92d20636b7634047225d102d06";

export default node;
