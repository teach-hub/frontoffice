/**
 * @generated SignedSource<<179ac1be2eaf7a5a368ab7fe83d8d5a6>>
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
    readonly description: string | null;
    readonly id: string;
    readonly submittedAgainAt: string | null;
    readonly submittedAt: string;
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
    "concreteType": "SubmissionType",
    "kind": "LinkedField",
    "name": "submitSubmissionAgain",
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
        "name": "description",
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
    "cacheID": "a21f71f2f51f74c2af82a023dcb38d1f",
    "id": null,
    "metadata": {},
    "name": "SubmitSubmissionAgainMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitSubmissionAgainMutation(\n  $courseId: ID!\n  $submissionId: ID!\n) {\n  submitSubmissionAgain(courseId: $courseId, submissionId: $submissionId) {\n    id\n    description\n    submittedAt\n    submittedAgainAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "4206fb07cc7127e355ed998df9fd2bb4";

export default node;
