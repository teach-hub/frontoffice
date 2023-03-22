/**
 * @generated SignedSource<<1c4f16d61ea612f3514d07b467b5a301>>
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
    readonly id: string;
    readonly userRoles: ReadonlyArray<{
      readonly course: {
        readonly id: string;
        readonly name: string;
        readonly period: number;
        readonly subject: {
          readonly active: boolean | null;
          readonly code: string | null;
          readonly id: string | null;
          readonly name: string | null;
        };
        readonly year: number;
      } | null;
      readonly id: string | null;
      readonly role: {
        readonly id: string | null;
        readonly name: string | null;
        readonly permissions: ReadonlyArray<string | null> | null;
      } | null;
    } | null> | null;
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
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserRoleType",
        "kind": "LinkedField",
        "name": "userRoles",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
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
                "concreteType": "SubjectType",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RoleType",
            "kind": "LinkedField",
            "name": "role",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
    "cacheID": "47aaec9e746690d22185ed016480cf35",
    "id": null,
    "metadata": {},
    "name": "coursesQuery",
    "operationKind": "query",
    "text": "query coursesQuery {\n  viewer {\n    id\n    userRoles {\n      id\n      course {\n        id\n        name\n        year\n        period\n        subject {\n          id\n          code\n          active\n          name\n        }\n      }\n      role {\n        id\n        name\n        permissions\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "216560c1a59a8754b973ff9a887f8b31";

export default node;
