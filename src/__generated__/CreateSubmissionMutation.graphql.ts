/**
 * @generated SignedSource<<3ab53b15292c41162a6c89d407585dcb>>
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
    "cacheID": "c5a398824f49e4221ffe928094337caf",
    "id": null,
    "metadata": {},
    "name": "CreateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSubmissionMutation(\n  $courseId: ID!\n  $assignmentId: ID!\n  $pullRequestUrl: String!\n  $description: String\n) {\n  createSubmission(courseId: $courseId, assignmentId: $assignmentId, pullRequestUrl: $pullRequestUrl, description: $description) {\n    id\n    submittedAt\n    submittedAgainAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b475be6342e1b788777a0513ebceb97";

export default node;
