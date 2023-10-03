/**
 * @generated SignedSource<<1f6ec197de3c2d98167315bcdcf70e82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddParticipantsToGroupMutation$variables = {
  assignmentId: string;
  courseId: string;
  groupId: string;
  participantUserRoleIds: ReadonlyArray<string>;
};
export type AddParticipantsToGroupMutation$data = {
  readonly addParticipantsToGroup: {
    readonly id: string;
  } | null;
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
  "name": "courseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "groupId"
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
        "name": "groupId",
        "variableName": "groupId"
      },
      {
        "kind": "Variable",
        "name": "participantUserRoleIds",
        "variableName": "participantUserRoleIds"
      }
    ],
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "addParticipantsToGroup",
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddParticipantsToGroupMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "AddParticipantsToGroupMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "a7b66aacfbccf27f66fb949107b1f768",
    "id": null,
    "metadata": {},
    "name": "AddParticipantsToGroupMutation",
    "operationKind": "mutation",
    "text": "mutation AddParticipantsToGroupMutation(\n  $courseId: ID!\n  $groupId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  addParticipantsToGroup(courseId: $courseId, groupId: $groupId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "22eed0c92956f6f462e9309f52498e22";

export default node;
