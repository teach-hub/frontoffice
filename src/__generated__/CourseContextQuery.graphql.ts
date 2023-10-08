/**
 * @generated SignedSource<<d5691d79e04d2d10a8986d12bd79106e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseContextQuery$variables = {
  courseId: string;
};
export type CourseContextQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly id: string;
      readonly subject: {
        readonly id: string;
        readonly name: string;
      };
      readonly viewerRole: {
        readonly id: string;
        readonly isTeacher: boolean;
        readonly name: string;
        readonly permissions: ReadonlyArray<string | null> | null;
      };
    } | null;
    readonly id: string;
  } | null;
};
export type CourseContextQuery = {
  response: CourseContextQuery$data;
  variables: CourseContextQuery$variables;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
      (v1/*: any*/),
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
            "concreteType": "SubjectType",
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RoleType",
            "kind": "LinkedField",
            "name": "viewerRole",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "permissions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isTeacher",
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
    "name": "CourseContextQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseContextQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "557ae47ebab5b9067163a6c5c8873732",
    "id": null,
    "metadata": {},
    "name": "CourseContextQuery",
    "operationKind": "query",
    "text": "query CourseContextQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      subject {\n        id\n        name\n      }\n      viewerRole {\n        id\n        name\n        permissions\n        isTeacher\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b6894adcecbb67252c8e8b3cf0a3b70";

export default node;
