/**
 * @generated SignedSource<<ca544f0cab8ade7de6e5b8e78d6734ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateSubmissionMutation$variables = {
  assignmentId: string;
  courseId: string;
  pullRequestUrl: string;
};
export type CreateSubmissionMutation$data = {
  readonly createSubmission: {
    readonly id: string;
    readonly viewerSubmission: {
      readonly id: string;
      readonly submittedAgainAt: string | null;
      readonly submittedAt: string;
    } | null;
  } | null;
};
export type CreateSubmissionMutation = {
  response: CreateSubmissionMutation$data;
  variables: CreateSubmissionMutation$variables;
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
  "name": "pullRequestUrl"
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
        "name": "pullRequestUrl",
        "variableName": "pullRequestUrl"
      }
    ],
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "createSubmission",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "SubmissionType",
        "kind": "LinkedField",
        "name": "viewerSubmission",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "submittedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "submittedAgainAt",
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
    "name": "CreateSubmissionMutation",
    "selections": (v4/*: any*/),
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
    "name": "CreateSubmissionMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "f729c7684439bd79d4b66dddc3b65b56",
    "id": null,
    "metadata": {},
    "name": "CreateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSubmissionMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $pullRequestUrl: String!\n) {\n  createSubmission(courseId: $courseId, assignmentId: $assignmentId, pullRequestUrl: $pullRequestUrl) {\n    id\n    viewerSubmission {\n      id\n      submittedAt\n      submittedAgainAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fba638f3a590237758313f8691ad915a";

export default node;
