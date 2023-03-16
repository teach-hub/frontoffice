/**
 * @generated SignedSource<<cde9d0bc8ed312f03cc191d570395941>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type coursesQuery$variables = {};
export type coursesQuery$data = {
  readonly viewer: {
    readonly courses: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly period: number;
      readonly role: {
        readonly name: string | null;
        readonly permissions: ReadonlyArray<string | null> | null;
      };
      readonly subject: {
        readonly active: boolean | null;
        readonly code: string;
        readonly id: string | null;
        readonly name: string;
      };
      readonly year: number;
    } | null>;
  } | null;
};
export type coursesQuery = {
  response: coursesQuery$data;
  variables: coursesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
      {
        "alias": null,
        "args": null,
        "concreteType": "ViewerCourseType",
        "kind": "LinkedField",
        "name": "courses",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "period",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ViewerRoleType",
            "kind": "LinkedField",
            "name": "role",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "permissions",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Subject",
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "active",
                "storageKey": null
              },
              (v1/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "coursesQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "coursesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6db7b3b72b49b999655c133186d0c1d4",
    "id": null,
    "metadata": {},
    "name": "coursesQuery",
    "operationKind": "query",
    "text": "query coursesQuery {\n  viewer {\n    courses {\n      id\n      name\n      year\n      period\n      role {\n        name\n        permissions\n      }\n      subject {\n        id\n        code\n        active\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d01bc58b4fea9a0345d6c5165aa713ed";

export default node;
