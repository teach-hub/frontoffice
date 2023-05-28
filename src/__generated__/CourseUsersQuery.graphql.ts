/**
 * @generated SignedSource<<f38fe401bdd2890cf22d8b5e74ff1183>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseUsersQuery$variables = {
  courseId: string;
};
export type CourseUsersQuery$data = {
  readonly viewer: {
    readonly findCourse: {
      readonly id: string;
      readonly name: string;
      readonly userRoles: ReadonlyArray<{
        readonly id: string;
        readonly role: {
          readonly id: string;
          readonly isTeacher: boolean;
          readonly name: string;
          readonly permissions: ReadonlyArray<string | null> | null;
        };
        readonly user: {
          readonly file: string;
          readonly id: string;
          readonly lastName: string;
          readonly name: string;
          readonly notificationEmail: string;
        };
      } | null> | null;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CourseUsersQuery = {
  response: CourseUsersQuery$data;
  variables: CourseUsersQuery$variables;
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "notificationEmail",
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
                    "name": "isTeacher",
                    "storageKey": null
                  },
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
    "name": "CourseUsersQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseUsersQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f449f39dbf08837575905f33721c63e9",
    "id": null,
    "metadata": {},
    "name": "CourseUsersQuery",
    "operationKind": "query",
    "text": "query CourseUsersQuery(\n  $courseId: String!\n) {\n  viewer {\n    id\n    name\n    findCourse(id: $courseId) {\n      id\n      name\n      userRoles {\n        id\n        user {\n          id\n          name\n          lastName\n          file\n          notificationEmail\n        }\n        role {\n          id\n          name\n          isTeacher\n          permissions\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b672836d3fa31c00c37b9577fd65d321";

export default node;
