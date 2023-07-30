/**
 * @generated SignedSource<<998595d286299f688e68de28bc294f1f>>
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
    readonly grade: number | null;
    readonly id: string;
    readonly reviewerId: string;
    readonly revisionRequested: boolean | null;
    readonly submissionId: string;
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "revisionRequested",
        "variableName": "revisionRequested"
      }
    ],
    "concreteType": "InternalReviewType",
    "kind": "LinkedField",
    "name": "updateReview",
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
    "name": "UpdateReviewMutation",
    "selections": (v4/*: any*/),
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
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "34d09ff6c6a713f47c86149a35b1ab5a",
    "id": null,
    "metadata": {},
    "name": "UpdateReviewMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateReviewMutation(\n  $id: ID!\n  $courseId: ID!\n  $revisionRequested: Boolean!\n  $grade: Int\n) {\n  updateReview(id: $id, courseId: $courseId, revisionRequested: $revisionRequested, grade: $grade) {\n    id\n    grade\n    revisionRequested\n    submissionId\n    reviewerId\n  }\n}\n"
  }
};
})();

(node as any).hash = "f9dfc5afb7ecf716d698fbf67c2c86c5";

export default node;
