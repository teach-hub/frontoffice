/**
 * @generated SignedSource<<7a6fb75ffff812b10e41c5e2deb05d2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddParticipantsToGroupMutation$variables = {
  assignmentId: string;
  groupId: string;
  participantUserRoleIds: ReadonlyArray<string>;
};
export type AddParticipantsToGroupMutation$data = {
  readonly addParticipantsToGroup: ReadonlyArray<{
    readonly id: string;
  } | null>;
};
export type AddParticipantsToGroupMutation = {
  response: AddParticipantsToGroupMutation$data;
  variables: AddParticipantsToGroupMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignmentId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "groupId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "participantUserRoleIds"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "assignmentId",
        "variableName": "assignmentId"
      },
      {
        "kind": "Variable",
        "name": "groupId",
        "variableName": "groupId"
      },
      {
        "kind": "Variable",
        "name": "participantUserRoleIds",
        "variableName": "participantUserRoleIds"
      }
    ],
    "concreteType": "InternalGroupParticipantType",
    "kind": "LinkedField",
    "name": "addParticipantsToGroup",
    "plural": true,
    "selections": [
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
    "name": "AddParticipantsToGroupMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "AddParticipantsToGroupMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "14b673eae5ffb272b045f22ffb3478dc",
    "id": null,
    "metadata": {},
    "name": "AddParticipantsToGroupMutation",
    "operationKind": "mutation",
    "text": "mutation AddParticipantsToGroupMutation(\n  $groupId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  addParticipantsToGroup(groupId: $groupId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c468b095e354295c66c44b049e31ec49";

export default node;
