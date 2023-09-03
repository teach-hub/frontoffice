/**
 * @generated SignedSource<<e5be54641d3ffccfdb014bf7b51ca11d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateReviewMutation$variables = {
  courseId: string;
  grade?: number | null;
  id: string;
  revisionRequested: boolean;
};
export type UpdateReviewMutation$data = {
  readonly updateReview: {
    readonly id: string;
    readonly review: {
      readonly grade: number | null;
      readonly id: string;
      readonly reviewedAgainAt: string | null;
      readonly reviewedAt: string;
      readonly reviewerId: string;
      readonly revisionRequested: boolean | null;
      readonly submissionId: string;
    } | null;
  };
};
export type UpdateReviewMutation = {
  response: UpdateReviewMutation$data;
  variables: UpdateReviewMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "grade"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "revisionRequested"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
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
        "name": "grade",
        "variableName": "grade"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "revisionRequested",
        "variableName": "revisionRequested"
      }
    ],
    "concreteType": "SubmissionType",
    "kind": "LinkedField",
    "name": "updateReview",
    "plural": false,
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "InternalReviewType",
        "kind": "LinkedField",
        "name": "review",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reviewedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reviewedAgainAt",
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateReviewMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateReviewMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "77c6ad0a1e7a43a6fca84d849edab7cf",
    "id": null,
    "metadata": {},
    "name": "UpdateReviewMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateReviewMutation(\n  $id: ID!\n  $courseId: ID!\n  $revisionRequested: Boolean!\n  $grade: Int\n) {\n  updateReview(id: $id, courseId: $courseId, revisionRequested: $revisionRequested, grade: $grade) {\n    id\n    review {\n      id\n      grade\n      revisionRequested\n      submissionId\n      reviewerId\n      reviewedAt\n      reviewedAgainAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "816b24b43ac63520e255381cbb6f0285";

export default node;
