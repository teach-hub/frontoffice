/**
 * @generated SignedSource<<c1c84381f2e6f5b6016f7e7dafad7321>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseInfoQuery$variables = {
  courseId: string;
};
export type CourseInfoQuery$data = {
  readonly viewer: {
    readonly availableOrganizations: {
      readonly names: ReadonlyArray<string> | null;
    } | null;
    readonly findCourse: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
      }>;
      readonly id: string;
      readonly name: string;
      readonly organization: string | null;
      readonly studentsCount: number;
      readonly subject: {
        readonly id: string;
        readonly name: string;
      };
      readonly teachersCount: number;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CourseInfoQuery = {
  response: CourseInfoQuery$data;
  variables: CourseInfoQuery$variables;
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
        "name": "findCourse",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "organization",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "studentsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "teachersCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignments",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ViewerOrganizations",
        "kind": "LinkedField",
        "name": "availableOrganizations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "names",
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
    "name": "CourseInfoQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseInfoQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5365403be4ca84ffc2db7c45722ee15e",
    "id": null,
    "metadata": {},
    "name": "CourseInfoQuery",
    "operationKind": "query",
    "text": "query CourseInfoQuery(\n  $courseId: String!\n) {\n  viewer {\n    id\n    name\n    findCourse(id: $courseId) {\n      id\n      name\n      organization\n      studentsCount\n      teachersCount\n      assignments {\n        id\n      }\n      subject {\n        id\n        name\n      }\n    }\n    availableOrganizations {\n      names\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "677aa354d22a0b6c3e8bdcf1489e1642";

export default node;
