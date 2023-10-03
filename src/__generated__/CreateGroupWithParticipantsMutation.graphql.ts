/**
 * @generated SignedSource<<b72451fd50a7da4a4b2f2839eb8e4adc>>
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
  participantUserRoleIds: ReadonlyArray<string>;
};
export type CreateGroupWithParticipantsMutation$data = {
  readonly createGroupWithParticipants: {
    readonly id: string;
  } | null;
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
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "participantUserRoleIds",
        "variableName": "participantUserRoleIds"
      }
    ],
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "createGroupWithParticipants",
    "plural": false,
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
    "name": "CreateGroupWithParticipantsMutation",
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
    "name": "CreateGroupWithParticipantsMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "397027d27ae8f61301dfc5097c75de5e",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantsMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantsMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  createGroupWithParticipants(courseId: $courseId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f7652791dc0d5c16d24fd537d785e7dc";

export default node;
