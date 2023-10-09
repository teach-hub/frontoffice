/**
 * @generated SignedSource<<cccc8b095af149ef8cada681d247cfcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateGroupWithParticipantMutation$variables = {
  assignmentId: string;
  courseId: string;
};
export type CreateGroupWithParticipantMutation$data = {
  readonly createGroupWithParticipant: {
    readonly id: string;
    readonly viewerGroupParticipants: ReadonlyArray<{
      readonly group: {
        readonly assignmentId: string;
        readonly courseId: string | null;
        readonly id: string;
        readonly members: ReadonlyArray<{
          readonly file: string;
          readonly id: string;
          readonly lastName: string;
          readonly name: string;
          readonly notificationEmail: string;
        }>;
        readonly name: string | null;
      };
      readonly id: string;
    }>;
  } | null;
};
export type CreateGroupWithParticipantMutation = {
  response: CreateGroupWithParticipantMutation$data;
  variables: CreateGroupWithParticipantMutation$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
      }
    ],
    "concreteType": "CourseType",
    "kind": "LinkedField",
    "name": "createGroupWithParticipant",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "InternalGroupParticipantType",
        "kind": "LinkedField",
        "name": "viewerGroupParticipants",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InternalGroupType",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "courseId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "assignmentId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserType",
                "kind": "LinkedField",
                "name": "members",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
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
                    "name": "notificationEmail",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateGroupWithParticipantMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateGroupWithParticipantMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "bb28abb992ef75b199c9f49c6643d7c5",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  createGroupWithParticipant(courseId: $courseId, assignmentId: $assignmentId) {\n    id\n    viewerGroupParticipants {\n      id\n      group {\n        id\n        name\n        courseId\n        assignmentId\n        members {\n          id\n          name\n          lastName\n          notificationEmail\n          file\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "65d549a9674bd6887b51c1a6c2565862";

export default node;
