/**
 * @generated SignedSource<<c9740986e1f2cdd4c82eeeee8434228b>>
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
    readonly group: {
      readonly courseId: string | null;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
      }
    ],
    "concreteType": "InternalGroupParticipantType",
    "kind": "LinkedField",
    "name": "createGroupWithParticipant",
    "plural": false,
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
    "selections": (v3/*: any*/),
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
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "91ad519b8c1c7f49a470a136c183d94f",
    "id": null,
    "metadata": {},
    "name": "CreateGroupWithParticipantMutation",
    "operationKind": "mutation",
    "text": "mutation CreateGroupWithParticipantMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  createGroupWithParticipant(courseId: $courseId, assignmentId: $assignmentId) {\n    id\n    group {\n      id\n      name\n      courseId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "29e8c6bbfa1be1f0279f0952a7a294f3";

export default node;
