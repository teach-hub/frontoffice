/**
 * @generated SignedSource<<6e7cba58ad31c06e15735932865cad76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateGroupWithParticipantsMutation$variables = {
  assignmentId: string;
  courseId: string;
  groupName: string;
  participantUserRoleIds: ReadonlyArray<string>;
};
export type CreateGroupWithParticipantsMutation$data = {
  readonly createGroupWithParticipants: ReadonlyArray<{
    readonly assignmentId: string;
    readonly id: string;
  } | null>;
};
export type CreateGroupWithParticipantsMutation = {
  response: CreateGroupWithParticipantsMutation$data;
  variables: CreateGroupWithParticipantsMutation$variables;
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
  "name": "courseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "groupName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "participantUserRoleIds"
},
v4 = [
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
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "groupName",
        "variableName": "groupName"
      },
      {
        "kind": "Variable",
        "name": "participantUserRoleIds",
        "variableName": "participantUserRoleIds"
      }
    ],
    "concreteType": "InternalGroupParticipantType",
    "kind": "LinkedField",
    "name": "createGroupWithParticipants",
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateGroupWithParticipantsMutation",
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
    "name": "CreateGroupWithParticipantsMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "ecac720079af563a7595328096bb8e2c",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantsMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantsMutation(\n  $groupName: String!\n  $courseId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  createGroupWithParticipants(groupName: $groupName, courseId: $courseId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n    assignmentId\n  }\n}\n"
  }
};
})();

(node as any).hash = "9625448a2faff1a5d46d4a5f207ca0de";

export default node;
