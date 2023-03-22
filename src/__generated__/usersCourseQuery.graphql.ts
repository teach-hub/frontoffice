/**
 * @generated SignedSource<<1073ca018b7f3e521f9a7573781b39a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type usersCourseQuery$variables = {
  courseId: string;
};
export type usersCourseQuery$data = {
  readonly viewer: {
    readonly findCourse: {
      readonly id: string;
      readonly name: string;
      readonly userRoles: ReadonlyArray<{
        readonly id: string | null;
        readonly role: {
          readonly id: string | null;
          readonly name: string | null;
          readonly permissions: ReadonlyArray<string | null> | null;
        } | null;
        readonly user: {
          readonly file: string | null;
          readonly id: string | null;
          readonly lastName: string | null;
          readonly name: string | null;
        } | null;
      } | null> | null;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type usersCourseQuery = {
  response: usersCourseQuery$data;
  variables: usersCourseQuery$variables;
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
            "concreteType": "UserRoleType",
            "kind": "LinkedField",
            "name": "userRoles",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "UserType",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "file",
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
                  (v1/*: any*/),
                  (v2/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "usersCourseQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usersCourseQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5b1bb8ddf9b16e86d7b2ef72d2c7e0ae",
    "id": null,
    "metadata": {},
    "name": "usersCourseQuery",
    "operationKind": "query",
    "text": "query usersCourseQuery(\n  $courseId: String!\n) {\n  viewer {\n    id\n    name\n    findCourse(id: $courseId) {\n      id\n      name\n      userRoles {\n        id\n        user {\n          id\n          name\n          lastName\n          file\n        }\n        role {\n          id\n          name\n          permissions\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3d31e9b7bd28ba16e2e14a50fe04e7c5";

export default node;
