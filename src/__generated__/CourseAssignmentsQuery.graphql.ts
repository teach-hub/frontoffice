/**
 * @generated SignedSource<<ee2cb18dbc417c208e2fb9da1a30582c>>
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
    readonly findCourse: {
      readonly assignments: ReadonlyArray<{
        readonly endDate: string | null;
        readonly id: string;
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
        "name": "findCourse",
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
    "cacheID": "e391dee5b5841c49ff9fa92c1372c102",
    "id": null,
    "metadata": {},
    "name": "CourseAssignmentsQuery",
    "operationKind": "query",
    "text": "query CourseAssignmentsQuery(\n  $courseId: String!\n) {\n  viewer {\n    id\n    name\n    findCourse(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n        endDate\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "459df1abf77023940ef30d1bec8fc2ed";

export default node;
