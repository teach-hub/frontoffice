/**
 * @generated SignedSource<<d0ed5ee5b9e9f4b73404e37859f4ce4f>>
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
    readonly submittedAgainAt: string | null;
    readonly submittedAt: string;
  };
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
        "name": "pullRequestUrl",
        "variableName": "pullRequestUrl"
      }
    ],
    "concreteType": "SubmissionType",
    "kind": "LinkedField",
    "name": "createSubmission",
    "plural": false,
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
    "name": "CreateSubmissionMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8bdbafd440af9c86338386d110193a20",
    "id": null,
    "metadata": {},
    "name": "CreateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSubmissionMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $pullRequestUrl: String!\n) {\n  createSubmission(courseId: $courseId, assignmentId: $assignmentId, pullRequestUrl: $pullRequestUrl) {\n    id\n    submittedAt\n    submittedAgainAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "f01b8cae47e89abfc99a43cf5a5602bf";

export default node;
