/**
 * @generated SignedSource<<0f1d7cabc2cbe3f941b414261d631870>>
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
  includeViewerSubmissions: boolean;
};
export type AssignmentQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly active: boolean | null;
        readonly allowLateSubmissions: boolean | null;
        readonly courseId: string;
        readonly description: string | null;
        readonly endDate: string | null;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly isOpenForSubmissions: boolean;
        readonly link: string | null;
        readonly startDate: string | null;
        readonly title: string | null;
        readonly viewerAlreadyMadeSubmission: boolean;
        readonly viewerSubmission?: {
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeViewerSubmissions"
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
                "variableName": "id"
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
                "kind": "ScalarField",
                "name": "allowLateSubmissions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "courseId",
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
                "name": "viewerAlreadyMadeSubmission",
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
                "name": "endDate",
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "active",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGroup",
                "storageKey": null
              },
              {
                "condition": "includeViewerSubmissions",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SubmissionType",
                    "kind": "LinkedField",
                    "name": "viewerSubmission",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ]
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
    "name": "AssignmentQuery",
    "selections": (v4/*: any*/),
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
    "name": "AssignmentQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "2ed8c9e3f87a1be2e5d35437b966bf50",
    "id": null,
    "metadata": {},
    "name": "AssignmentQuery",
    "operationKind": "query",
    "text": "query AssignmentQuery(\n  $id: ID!\n  $courseId: ID!\n  $includeViewerSubmissions: Boolean!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $id) {\n        id\n        allowLateSubmissions\n        courseId\n        isOpenForSubmissions\n        viewerAlreadyMadeSubmission\n        description\n        endDate\n        link\n        startDate\n        title\n        active\n        isGroup\n        viewerSubmission @include(if: $includeViewerSubmissions) {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c8cd4623e66c2fdea215796b7887fa4d";

export default node;
