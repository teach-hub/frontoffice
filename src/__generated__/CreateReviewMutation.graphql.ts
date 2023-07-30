/**
 * @generated SignedSource<<542c1d03db6545345256e4a4e555a160>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateReviewMutation$variables = {
  courseId: string;
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
  "name": "revisionRequested"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "submissionId"
},
v4 = [
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateReviewMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateReviewMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "5ba7583d185eeb2b88100e7712471334",
    "id": null,
    "metadata": {},
    "name": "CreateReviewMutation",
    "operationKind": "mutation",
    "text": "mutation CreateReviewMutation(\n  $submissionId: ID!\n  $courseId: ID!\n  $revisionRequested: Boolean!\n  $grade: Int\n) {\n  createReview(submissionId: $submissionId, courseId: $courseId, revisionRequested: $revisionRequested, grade: $grade) {\n    id\n    grade\n    revisionRequested\n    submissionId\n    reviewerId\n  }\n}\n"
  }
};
})();

(node as any).hash = "0825988084a7dd1445723d2407832b31";

export default node;
