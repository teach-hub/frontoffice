/**
 * @generated SignedSource<<0f14764e17e627deba7694fea3f2cce2>>
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
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
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "InternalGroupParticipantType",
        "kind": "LinkedField",
        "name": "groupParticipants",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InternalGroupType",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
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
              (v3/*: any*/),
              (v4/*: any*/),
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
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateGroupWithParticipantsMutation",
    "selections": (v5/*: any*/),
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
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "6652c84e0bf1b4f06a4add1aa158ed7d",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantsMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantsMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $participantUserRoleIds: [ID!]!\n) {\n  createGroupWithParticipants(courseId: $courseId, assignmentId: $assignmentId, participantUserRoleIds: $participantUserRoleIds) {\n    id\n    groupParticipants {\n      id\n      group {\n        id\n        name\n      }\n      userRoleId\n      user {\n        id\n        name\n        lastName\n        file\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a41c4e8e3250e26c949d7007a555ecc";

export default node;
