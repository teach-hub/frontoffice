/**
 * @generated SignedSource<<aa7203e92236b450f3de7bca3658c14f>>
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
  description?: string | null;
  pullRequestUrl: string;
};
export type CreateSubmissionMutation$data = {
  readonly createSubmission: {
    readonly errors: ReadonlyArray<string>;
    readonly success: boolean | null;
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
  "name": "description"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pullRequestUrl"
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
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "pullRequestUrl",
        "variableName": "pullRequestUrl"
      }
    ],
    "concreteType": "CreateSubmissionResultType",
    "kind": "LinkedField",
    "name": "createSubmission",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "errors",
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
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateSubmissionMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "9934c6a29bbbcbe8a201534de7422013",
    "id": null,
    "metadata": {},
    "name": "CreateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSubmissionMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $pullRequestUrl: String!\n  $description: String\n) {\n  createSubmission(courseId: $courseId, assignmentId: $assignmentId, pullRequestUrl: $pullRequestUrl, description: $description) {\n    success\n    errors\n  }\n}\n"
  }
};
})();

(node as any).hash = "07d4f5400c3a17f8f975301d4aaa47e8";

export default node;
