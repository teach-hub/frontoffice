/**
 * @generated SignedSource<<78dfb69f58995d9099f0e517e268fdf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type JoinGroupMutation$variables = {
  assignmentId: string;
  courseId: string;
  groupId: string;
};
export type JoinGroupMutation$data = {
  readonly joinGroup: {
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
  };
};
export type JoinGroupMutation = {
  response: JoinGroupMutation$data;
  variables: JoinGroupMutation$variables;
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
        "name": "groupId",
        "variableName": "groupId"
      }
    ],
    "concreteType": "InternalGroupParticipantType",
    "kind": "LinkedField",
    "name": "joinGroup",
    "plural": false,
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
          (v4/*: any*/),
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
    "name": "JoinGroupMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "JoinGroupMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "c5872ba06689139a48a539f6b9f0fc2a",
    "id": null,
    "metadata": {},
    "name": "JoinGroupMutation",
    "operationKind": "mutation",
    "text": "mutation JoinGroupMutation(\n  $groupId: ID!\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  joinGroup(groupId: $groupId, courseId: $courseId, assignmentId: $assignmentId) {\n    id\n    group {\n      id\n      name\n      courseId\n      assignmentId\n      members {\n        id\n        name\n        lastName\n        notificationEmail\n        file\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "856c76ff42c9c0674a247c65040e777f";

export default node;
