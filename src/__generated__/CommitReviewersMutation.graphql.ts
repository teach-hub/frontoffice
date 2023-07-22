/**
 * @generated SignedSource<<21728c99cf5067ce9805faa99d3a5b22>>
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
  revieweeId: string;
  reviewerUserId: string;
};
export type CommitReviewersMutation$variables = {
  input: AssignReviewersInputType;
};
export type CommitReviewersMutation$data = {
  readonly assignReviewers: ReadonlyArray<{
    readonly id: string;
    readonly reviewee: {
      readonly __typename: "InternalGroupType";
      readonly groupName: string | null;
      readonly id: string;
    } | {
      readonly __typename: "UserType";
      readonly file: string;
      readonly id: string;
      readonly lastName: string;
      readonly name: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
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
        "concreteType": null,
        "kind": "LinkedField",
        "name": "reviewee",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/),
              {
                "alias": "groupName",
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "type": "InternalGroupType",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
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
            "type": "UserType",
            "abstractKey": null
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
    "cacheID": "2e4203af796130e733e9d951b5ce76d5",
    "id": null,
    "metadata": {},
    "name": "CommitReviewersMutation",
    "operationKind": "mutation",
    "text": "mutation CommitReviewersMutation(\n  $input: AssignReviewersInputType!\n) {\n  assignReviewers(input: $input) {\n    id\n    reviewer {\n      id\n      name\n      lastName\n    }\n    reviewee {\n      __typename\n      ... on InternalGroupType {\n        id\n        groupName: name\n      }\n      ... on UserType {\n        id\n        name\n        lastName\n        file\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "76b18859bef75e7c88598da903004978";

export default node;
