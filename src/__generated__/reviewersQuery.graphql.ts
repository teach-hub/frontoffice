/**
 * @generated SignedSource<<cd505525f60599514e875c8ebea81eda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
        readonly previewReviewers: ReadonlyArray<{
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
        readonly reviewers: ReadonlyArray<{
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
v6 = {
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
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewee",
  "plural": false,
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
  "storageKey": null
},
v8 = [
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
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "courseId"
          }
        ],
        "concreteType": "CourseType",
        "kind": "LinkedField",
        "name": "course",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "assignmentId"
              }
            ],
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
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
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
                  (v7/*: any*/),
                  (v6/*: any*/)
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
    "name": "reviewersQuery",
    "selections": (v8/*: any*/),
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
    "selections": (v8/*: any*/)
  },
  "params": {
    "cacheID": "85a950ac91642bf4667444df406a27dd",
    "id": null,
    "metadata": {},
    "name": "reviewersQuery",
    "operationKind": "query",
    "text": "query reviewersQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n  $consecutive: Boolean!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $assignmentId) {\n        id\n        reviewers {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n          reviewee {\n            id\n            name\n            lastName\n            file\n          }\n        }\n        previewReviewers(consecutive: $consecutive) {\n          id\n          reviewee {\n            id\n            name\n            lastName\n            file\n          }\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "27cf3158b9f362912082408b38c1215f";

export default node;
