/**
 * @generated SignedSource<<7de8603962b9bfc1ecf815598e5e1ef2>>
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
    readonly assignmentId: string;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "assignmentId",
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
    "cacheID": "7c828edfbc6c90080c0a7af9a5847081",
    "id": null,
    "metadata": {},
    "name": "AddParticipantsToGroupMutation",
    "operationKind": "mutation",
    "text": "mutation AddParticipantsToGroupMutation(\n  $groupId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  addParticipantsToGroup(groupId: $groupId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n    assignmentId\n  }\n}\n"
  }
};
})();

(node as any).hash = "a657966af51b1ad454f8728b3decf7f2";

export default node;
