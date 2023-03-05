/**
 * @generated SignedSource<<81eed703679d4fd13f48c369da63f2e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserCoursesQuery$variables = {};
export type UserCoursesQuery$data = {
  readonly viewer: {
    readonly courses: ReadonlyArray<{
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
export type UserCoursesQuery = {
  response: UserCoursesQuery$data;
  variables: UserCoursesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
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
              (v0/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
              (v0/*: any*/)
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
    "name": "UserCoursesQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserCoursesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "39746aa434df85f20c3d7568f165780a",
    "id": null,
    "metadata": {},
    "name": "UserCoursesQuery",
    "operationKind": "query",
    "text": "query UserCoursesQuery {\n  viewer {\n    courses {\n      name\n      year\n      period\n      role {\n        name\n        permissions\n      }\n      subject {\n        id\n        code\n        active\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8a256179135f35152fc3525393e7686b";

export default node;
