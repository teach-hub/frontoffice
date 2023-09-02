/**
 * @generated SignedSource<<7d8a1dcec0a802a30b0023014192ceff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentQuery$variables = {
  courseId: string;
  id: string;
};
export type AssignmentQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly allowLateSubmissions: boolean | null;
        readonly description: string | null;
        readonly endDate: string | null;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly isOpenForSubmissions: boolean;
        readonly link: string | null;
        readonly startDate: string | null;
        readonly title: string | null;
        readonly viewerSubmission: {
          readonly id: string;
        } | null;
      } | null;
      readonly id: string;
    } | null;
    readonly id: string;
  } | null;
};
export type AssignmentQuery = {
  response: AssignmentQuery$data;
  variables: AssignmentQuery$variables;
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
  "name": "id"
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "id"
              }
            ],
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignment",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "viewerSubmission",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowLateSubmissions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isOpenForSubmissions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "link",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGroup",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AssignmentQuery",
    "selections": (v3/*: any*/),
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
    "name": "AssignmentQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "891c12bb8295402b94549831d60cda59",
    "id": null,
    "metadata": {},
    "name": "AssignmentQuery",
    "operationKind": "query",
    "text": "query AssignmentQuery(\n  $id: ID!\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $id) {\n        id\n        viewerSubmission {\n          id\n        }\n        allowLateSubmissions\n        isOpenForSubmissions\n        title\n        description\n        link\n        startDate\n        endDate\n        isGroup\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fbdf7c521c0b54f01562df58b93f6b5a";

export default node;
