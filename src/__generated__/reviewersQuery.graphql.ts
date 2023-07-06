/**
 * @generated SignedSource<<9157844defaaaca6a3cc967203110b5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewersQuery$variables = {
  assignmentId: string;
  consecutive: boolean;
  courseId: string;
};
export type reviewersQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly id: string;
        readonly reviewers: ReadonlyArray<{
          readonly id: string;
          readonly reviewee: {
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
        readonly " $fragmentSpreads": FragmentRefs<"reviewersPreview">;
      } | null;
      readonly id: string;
    } | null;
    readonly id: string;
  } | null;
};
export type reviewersQuery = {
  response: reviewersQuery$data;
  variables: reviewersQuery$variables;
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
  "name": "consecutive"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
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
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "assignmentId"
  }
],
v6 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastName",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewee",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ReviewerType",
  "kind": "LinkedField",
  "name": "reviewers",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/)
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
    "name": "reviewersQuery",
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
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v9/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "reviewersPreview"
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "reviewersQuery",
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
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "consecutive",
                        "variableName": "consecutive"
                      }
                    ],
                    "concreteType": "ReviewerPreviewType",
                    "kind": "LinkedField",
                    "name": "previewReviewers",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v8/*: any*/),
                      (v7/*: any*/)
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
    "cacheID": "739b3bf9110fdf9ba0f59d697dbd347d",
    "id": null,
    "metadata": {},
    "name": "reviewersQuery",
    "operationKind": "query",
    "text": "query reviewersQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n  $consecutive: Boolean!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $assignmentId) {\n        id\n        reviewers {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n          reviewee {\n            id\n            name\n            lastName\n          }\n        }\n        ...reviewersPreview\n      }\n    }\n  }\n}\n\nfragment reviewersPreview on AssignmentType {\n  previewReviewers(consecutive: $consecutive) {\n    id\n    reviewee {\n      id\n      name\n      lastName\n    }\n    reviewer {\n      id\n      name\n      lastName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "43b6dc0ba00f419025cdead9dda68235";

export default node;
