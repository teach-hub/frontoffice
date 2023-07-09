/**
 * @generated SignedSource<<32a1099a8029218db5c17ddb5ba87c69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AssignReviewersInputType = {
  assignmentId: string;
  reviewers: ReadonlyArray<ReviewersAssignmentInputType>;
};
export type ReviewersAssignmentInputType = {
  revieweeUserId: string;
  reviewerUserId: string;
};
export type CommitReviewersMutation$variables = {
  input: AssignReviewersInputType;
};
export type CommitReviewersMutation$data = {
  readonly assignReviewers: ReadonlyArray<{
    readonly id: string;
    readonly reviewee: {
      readonly file: string;
      readonly id: string;
      readonly lastName: string;
      readonly name: string;
    };
    readonly reviewer: {
      readonly id: string;
      readonly lastName: string;
      readonly name: string;
    };
  }>;
};
export type CommitReviewersMutation = {
  response: CommitReviewersMutation$data;
  variables: CommitReviewersMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ReviewerType",
    "kind": "LinkedField",
    "name": "assignReviewers",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "reviewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "reviewee",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "file",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommitReviewersMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommitReviewersMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "29562386c2f5d92191c6e2f33709d99c",
    "id": null,
    "metadata": {},
    "name": "CommitReviewersMutation",
    "operationKind": "mutation",
    "text": "mutation CommitReviewersMutation(\n  $input: AssignReviewersInputType!\n) {\n  assignReviewers(input: $input) {\n    id\n    reviewer {\n      id\n      name\n      lastName\n    }\n    reviewee {\n      id\n      name\n      lastName\n      file\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d9b6b53d5410694858eb5404b8a6be9f";

export default node;
