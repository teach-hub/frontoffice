/**
 * @generated SignedSource<<ac30834744b7a88ec81f4b7a99cdaebd>>
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
            "concreteType": "RoleType",
            "kind": "LinkedField",
            "name": "viewerRole",
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
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseContextQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1d7920c1d15d276ed07c8f9c30643eaf",
    "id": null,
    "metadata": {},
    "name": "CourseContextQuery",
    "operationKind": "query",
    "text": "query CourseContextQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      viewerRole {\n        id\n        name\n        permissions\n        isTeacher\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca1c0562b55b5d643b0ab9fd537fe25b";

export default node;
