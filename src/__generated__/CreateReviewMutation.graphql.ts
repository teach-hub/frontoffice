/**
 * @generated SignedSource<<5fd5e3d50aa60d126116cfc3580dbd32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateReviewMutation$variables = {
  grade?: number | null;
  revisionRequested: boolean;
  submissionId: string;
};
export type CreateReviewMutation$data = {
  readonly createReview: {
    readonly grade: number | null;
    readonly id: string;
    readonly reviewerId: string;
    readonly revisionRequested: boolean | null;
    readonly submissionId: string;
  };
};
export type CreateReviewMutation = {
  response: CreateReviewMutation$data;
  variables: CreateReviewMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "grade"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "revisionRequested"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "submissionId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "grade",
        "variableName": "grade"
      },
      {
        "kind": "Variable",
        "name": "revisionRequested",
        "variableName": "revisionRequested"
      },
      {
        "kind": "Variable",
        "name": "submissionId",
        "variableName": "submissionId"
      }
    ],
    "concreteType": "InternalReviewType",
    "kind": "LinkedField",
    "name": "createReview",
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
        "name": "grade",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revisionRequested",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "submissionId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "reviewerId",
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
    "name": "CreateReviewMutation",
    "selections": (v3/*: any*/),
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
    "name": "CreateReviewMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "dacc265e37a85b9b80069d150e8e8bd7",
    "id": null,
    "metadata": {},
    "name": "CreateReviewMutation",
    "operationKind": "mutation",
    "text": "mutation CreateReviewMutation(\n  $submissionId: ID!\n  $revisionRequested: Boolean!\n  $grade: Int\n) {\n  createReview(submissionId: $submissionId, revisionRequested: $revisionRequested, grade: $grade) {\n    id\n    grade\n    revisionRequested\n    submissionId\n    reviewerId\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a395843551c2a45e7a7a6eb96ed3436";

export default node;
