/**
 * @generated SignedSource<<9c9746898abf12f3aa968f2e184bed8d>>
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
export type PreviewReviewersFilterInputType = {
  consecutive: boolean;
  teachersUserIds: ReadonlyArray<string | null>;
};
export type CommitReviewersMutation$variables = {
  courseId: string;
  filters: PreviewReviewersFilterInputType;
  input: AssignReviewersInputType;
};
export type CommitReviewersMutation$data = {
  readonly assignReviewers: {
    readonly id: string;
    readonly previewReviewers: ReadonlyArray<{
      readonly id: string;
    }>;
    readonly reviewers: ReadonlyArray<{
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
  "name": "filters"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = [
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
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "assignReviewers",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "filters"
          }
        ],
        "concreteType": "ReviewerPreviewType",
        "kind": "LinkedField",
        "name": "previewReviewers",
        "plural": true,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ReviewerType",
        "kind": "LinkedField",
        "name": "reviewers",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserType",
            "kind": "LinkedField",
            "name": "reviewer",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
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
                  (v3/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
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
    "name": "CommitReviewersMutation",
    "selections": (v6/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommitReviewersMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "c4146c5130d5f43eab3030c480666997",
    "id": null,
    "metadata": {},
    "name": "CommitReviewersMutation",
    "operationKind": "mutation",
    "text": "mutation CommitReviewersMutation(\n  $input: AssignReviewersInputType!\n  $courseId: ID!\n  $filters: PreviewReviewersFilterInputType!\n) {\n  assignReviewers(input: $input, courseId: $courseId) {\n    id\n    previewReviewers(input: $filters) {\n      id\n    }\n    reviewers {\n      id\n      reviewer {\n        id\n        name\n        lastName\n      }\n      reviewee {\n        __typename\n        ... on InternalGroupType {\n          id\n          groupName: name\n        }\n        ... on UserType {\n          id\n          name\n          lastName\n          file\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b48c0ffad8384d1d493211c12077625d";

export default node;
