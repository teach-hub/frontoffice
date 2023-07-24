/**
 * @generated SignedSource<<3c1a75f8125d1e1dec4c28ba0b7892f0>>
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
  courseId: string;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
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
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ReviewerType",
    "kind": "LinkedField",
    "name": "assignReviewers",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserType",
        "kind": "LinkedField",
        "name": "reviewer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
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
              (v2/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommitReviewersMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommitReviewersMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "6a96c4b8e7e9b9ea77b99d0e735baf3e",
    "id": null,
    "metadata": {},
    "name": "CommitReviewersMutation",
    "operationKind": "mutation",
    "text": "mutation CommitReviewersMutation(\n  $input: AssignReviewersInputType!\n  $courseId: ID!\n) {\n  assignReviewers(input: $input, courseId: $courseId) {\n    id\n    reviewer {\n      id\n      name\n      lastName\n    }\n    reviewee {\n      __typename\n      ... on InternalGroupType {\n        id\n        groupName: name\n      }\n      ... on UserType {\n        id\n        name\n        lastName\n        file\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc70fc94ab6f1b99fc1699ad5ac059b7";

export default node;
