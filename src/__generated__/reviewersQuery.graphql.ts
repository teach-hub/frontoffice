/**
 * @generated SignedSource<<6aebe88df72dae74a711848eaecbefa8>>
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
  "name": "courseId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "courseId"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "assignmentId"
  }
],
v5 = [
  (v2/*: any*/),
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
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "reviewee",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ReviewerType",
  "kind": "LinkedField",
  "name": "reviewers",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "reviewersPreview"
                  },
                  (v8/*: any*/)
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
      (v0/*: any*/)
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": "previewData",
                    "args": null,
                    "concreteType": "ReviewerPreviewType",
                    "kind": "LinkedField",
                    "name": "previewReviewers",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v7/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
    "cacheID": "44d5a33c2a6b9bbdc2583d69a833b606",
    "id": null,
    "metadata": {},
    "name": "reviewersQuery",
    "operationKind": "query",
    "text": "query reviewersQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $assignmentId) {\n        id\n        ...reviewersPreview\n        reviewers {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n          reviewee {\n            id\n            name\n            lastName\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment reviewersPreview on AssignmentType {\n  previewData: previewReviewers {\n    id\n    reviewee {\n      id\n      name\n      lastName\n    }\n    reviewer {\n      id\n      name\n      lastName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "69419401f68bf22697184947f74505cb";

export default node;
