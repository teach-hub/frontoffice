/**
 * @generated SignedSource<<824a72d3af4cc1920e62f0b906c1ca95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PreviewReviewersFilterInputType = {
  consecutive: boolean;
  teachersUserIds: ReadonlyArray<string | null>;
};
export type RemoveReviewersMutation$variables = {
  assignmentId: string;
  courseId: string;
  filters: PreviewReviewersFilterInputType;
  reviewerIds: ReadonlyArray<string>;
};
export type RemoveReviewersMutation$data = {
  readonly removeReviewers: {
    readonly id: string;
    readonly previewReviewers: ReadonlyArray<{
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
export type RemoveReviewersMutation = {
  response: RemoveReviewersMutation$data;
  variables: RemoveReviewersMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignmentId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filters"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reviewerIds"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v7 = {
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
        (v4/*: any*/),
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
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
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
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "assignmentId",
        "variableName": "assignmentId"
      },
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "reviewers",
        "variableName": "reviewerIds"
      }
    ],
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "removeReviewers",
    "plural": false,
    "selections": [
      (v4/*: any*/),
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
          (v4/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
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
          (v4/*: any*/),
          (v8/*: any*/),
          (v7/*: any*/)
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
    "name": "RemoveReviewersMutation",
    "selections": (v9/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "RemoveReviewersMutation",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "5ca87aa4ef50247bbd7506187c7185fe",
    "id": null,
    "metadata": {},
    "name": "RemoveReviewersMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveReviewersMutation(\n  $reviewerIds: [ID!]!\n  $courseId: ID!\n  $assignmentId: ID!\n  $filters: PreviewReviewersFilterInputType!\n) {\n  removeReviewers(reviewers: $reviewerIds, assignmentId: $assignmentId, courseId: $courseId) {\n    id\n    previewReviewers(input: $filters) {\n      id\n      reviewee {\n        __typename\n        ... on InternalGroupType {\n          id\n          groupName: name\n        }\n        ... on UserType {\n          id\n          name\n          lastName\n          file\n        }\n      }\n      reviewer {\n        id\n        name\n        lastName\n      }\n    }\n    reviewers {\n      id\n      reviewer {\n        id\n        name\n        lastName\n      }\n      reviewee {\n        __typename\n        ... on InternalGroupType {\n          id\n          groupName: name\n        }\n        ... on UserType {\n          id\n          name\n          lastName\n          file\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed9b9078bd31dff4a508cb88d858c989";

export default node;
