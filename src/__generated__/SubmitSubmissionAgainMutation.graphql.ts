/**
 * @generated SignedSource<<cba2cf738838b5e8d58656a62e184002>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SubmitSubmissionAgainMutation$variables = {
  courseId: string;
  submissionId: string;
};
export type SubmitSubmissionAgainMutation$data = {
  readonly submitSubmissionAgain: {
    readonly errors: ReadonlyArray<string>;
    readonly success: boolean | null;
  } | null;
};
export type SubmitSubmissionAgainMutation = {
  response: SubmitSubmissionAgainMutation$data;
  variables: SubmitSubmissionAgainMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "courseId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "submissionId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "submissionId",
        "variableName": "submissionId"
      }
    ],
    "concreteType": "SubmitSubmissionResultType",
    "kind": "LinkedField",
    "name": "submitSubmissionAgain",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmitSubmissionAgainMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitSubmissionAgainMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f75daeef3986f6a7a3f14333f94c3da",
    "id": null,
    "metadata": {},
    "name": "SubmitSubmissionAgainMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitSubmissionAgainMutation(\n  $courseId: ID!\n  $submissionId: ID!\n) {\n  submitSubmissionAgain(courseId: $courseId, submissionId: $submissionId) {\n    success\n    errors\n  }\n}\n"
  }
};
})();

(node as any).hash = "36c09699849a77071fff88d17b4627b8";

export default node;
