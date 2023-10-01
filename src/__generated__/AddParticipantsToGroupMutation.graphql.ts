/**
 * @generated SignedSource<<41a371373183b8800f75ccf3f738a176>>
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
    readonly groupParticipants: ReadonlyArray<{
      readonly group: {
        readonly id: string;
        readonly name: string | null;
      };
      readonly id: string;
      readonly user: {
        readonly file: string;
        readonly id: string;
        readonly lastName: string;
        readonly name: string;
      };
      readonly userRoleId: string;
    }>;
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
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
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "InternalGroupParticipantType",
        "kind": "LinkedField",
        "name": "groupParticipants",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InternalGroupType",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userRoleId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserType",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "file",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "selections": (v6/*: any*/),
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
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "1ed0b5ba3676c609a4cc9f2d773d28de",
    "id": null,
    "metadata": {},
    "name": "AddParticipantsToGroupMutation",
    "operationKind": "mutation",
    "text": "mutation AddParticipantsToGroupMutation(\n  $courseId: ID!\n  $groupId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  addParticipantsToGroup(courseId: $courseId, groupId: $groupId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n    groupParticipants {\n      id\n      group {\n        id\n        name\n      }\n      userRoleId\n      user {\n        id\n        name\n        lastName\n        file\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "02931af6bfb9138f1f792c649a8cb8d2";

export default node;
