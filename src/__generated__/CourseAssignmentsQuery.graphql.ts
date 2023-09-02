/**
 * @generated SignedSource<<47a22a54a42084baa5a7ccb23fd06966>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseAssignmentsQuery$variables = {
  courseId: string;
  includeViewerSubmissions: boolean;
};
export type CourseAssignmentsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly endDate: string | null;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly title: string | null;
        readonly viewerSubmission?: {
          readonly id: string;
        } | null;
      }>;
      readonly id: string;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CourseAssignmentsQuery = {
  response: CourseAssignmentsQuery$data;
  variables: CourseAssignmentsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "courseId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "includeViewerSubmissions"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewerType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignments",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
                "name": "endDate",
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
                      (v1/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CourseAssignmentsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseAssignmentsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "093ba39f00dd7d91533131b7c06b2ee0",
    "id": null,
    "metadata": {},
    "name": "CourseAssignmentsQuery",
    "operationKind": "query",
    "text": "query CourseAssignmentsQuery(\n  $courseId: ID!\n  $includeViewerSubmissions: Boolean!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n        endDate\n        isGroup\n        viewerSubmission @include(if: $includeViewerSubmissions) {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e052d4b264824f9aa8d79c08bb32ca12";

export default node;
