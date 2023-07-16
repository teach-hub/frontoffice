/**
 * @generated SignedSource<<fff1b5ab720c78e510b86182d682c5db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PreviewReviewersFilterInputType = {
  consecutive: boolean;
  teachersUserIds: ReadonlyArray<string | null>;
};
export type ReviewersAssignmentQuery$variables = {
  assignmentId: string;
  courseId: string;
  filters: PreviewReviewersFilterInputType;
};
export type ReviewersAssignmentQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly id: string;
        readonly previewReviewers: ReadonlyArray<{
          readonly id: string;
          readonly reviewee: {
            readonly file?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly name?: string;
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
            readonly file?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly name?: string;
          };
          readonly reviewer: {
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          };
        }>;
      } | null;
      readonly id: string;
      readonly teachersUserRoles: ReadonlyArray<{
        readonly id: string;
        readonly user: {
          readonly id: string;
          readonly lastName: string;
          readonly name: string;
        };
      }>;
    } | null;
    readonly id: string;
  } | null;
};
export type ReviewersAssignmentQuery = {
  response: ReviewersAssignmentQuery$data;
  variables: ReviewersAssignmentQuery$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "courseId"
  }
],
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
v7 = [
  (v3/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "UserRoleType",
  "kind": "LinkedField",
  "name": "teachersUserRoles",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": (v7/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "assignmentId"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/),
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
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "reviewee",
  "plural": false,
  "selections": [
    (v11/*: any*/)
  ],
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "filters"
  }
],
v14 = {
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
    (v11/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v3/*: any*/)
      ],
      "type": "InternalGroupType",
      "abstractKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewersAssignmentQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ViewerType",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReviewerType",
                    "kind": "LinkedField",
                    "name": "reviewers",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v10/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v13/*: any*/),
                    "concreteType": "ReviewerPreviewType",
                    "kind": "LinkedField",
                    "name": "previewReviewers",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v12/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
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
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ReviewersAssignmentQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ViewerType",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReviewerType",
                    "kind": "LinkedField",
                    "name": "reviewers",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v10/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v13/*: any*/),
                    "concreteType": "ReviewerPreviewType",
                    "kind": "LinkedField",
                    "name": "previewReviewers",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v14/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
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
    ]
  },
  "params": {
    "cacheID": "be3f19c7031b5d61d937f8f89419e939",
    "id": null,
    "metadata": {},
    "name": "ReviewersAssignmentQuery",
    "operationKind": "query",
    "text": "query ReviewersAssignmentQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n  $filters: PreviewReviewersFilterInputType!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      teachersUserRoles {\n        id\n        user {\n          id\n          name\n          lastName\n        }\n      }\n      assignment(id: $assignmentId) {\n        id\n        reviewers {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n          reviewee {\n            __typename\n            ... on UserType {\n              id\n              name\n              lastName\n              file\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n        }\n        previewReviewers(input: $filters) {\n          id\n          reviewee {\n            __typename\n            ... on UserType {\n              id\n              name\n              lastName\n              file\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "03e849dc7914caef60f38f79103e9c88";

export default node;
