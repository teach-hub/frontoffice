/**
 * @generated SignedSource<<d6320b11b50ec58040c71d1a0ba935e9>>
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
  groupName: string;
};
export type CreateGroupWithParticipantMutation$data = {
  readonly createGroupWithParticipant: {
    readonly assignmentId: string | null;
    readonly group: {
      readonly courseId: string;
      readonly id: string;
      readonly name: string | null;
    };
    readonly id: string;
  };
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "groupName"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
      },
      {
        "kind": "Variable",
        "name": "groupName",
        "variableName": "groupName"
      }
    ],
    "concreteType": "InternalGroupParticipantType",
    "kind": "LinkedField",
    "name": "createGroupWithParticipant",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "courseId",
            "storageKey": null
          }
        ],
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
    "name": "CreateGroupWithParticipantMutation",
    "selections": (v4/*: any*/),
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
    "name": "CreateGroupWithParticipantMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "22b5402e858664470ae0de75b8c51776",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantMutation(\n  $groupName: String!\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  createGroupWithParticipant(groupName: $groupName, courseId: $courseId, assignmentId: $assignmentId) {\n    id\n    group {\n      id\n      name\n      courseId\n    }\n    assignmentId\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5092d9153f7320d218da921b5e8adf3";

export default node;
