/**
 * @generated SignedSource<<442ebf70744fb311b797cd56b2254963>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseAssignmentsQuery$variables = {
  courseId: string;
};
export type CourseAssignmentsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly endDate: string | null;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly title: string | null;
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
    "cacheID": "944c64cedc5d184f4e4c96900d0a9d74",
    "id": null,
    "metadata": {},
    "name": "CourseAssignmentsQuery",
    "operationKind": "query",
    "text": "query CourseAssignmentsQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n        endDate\n        isGroup\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73bf7502f0a27261ed4a9023369c0848";

export default node;
