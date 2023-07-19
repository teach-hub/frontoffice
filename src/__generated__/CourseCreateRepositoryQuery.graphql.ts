/**
 * @generated SignedSource<<7cb3ecb94483765c6eda55ab5e4f03b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseCreateRepositoryQuery$variables = {
  courseId: string;
};
export type CourseCreateRepositoryQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly groups: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly usersByAssignments: ReadonlyArray<{
          readonly assignments: ReadonlyArray<{
            readonly id: string;
            readonly title: string | null;
          }>;
          readonly users: ReadonlyArray<{
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
            readonly notificationEmail: string;
          }>;
        }>;
      }>;
      readonly id: string;
      readonly name: string;
      readonly organization: string | null;
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
      }> | null;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CourseCreateRepositoryQuery = {
  response: CourseCreateRepositoryQuery$data;
  variables: CourseCreateRepositoryQuery$variables;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notificationEmail",
  "storageKey": null
},
v6 = [
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
        "name": "course",
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InternalGroupType",
            "kind": "LinkedField",
            "name": "groups",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "InternalGroupUsersByAssignments",
                "kind": "LinkedField",
                "name": "usersByAssignments",
                "plural": true,
                "selections": [
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserType",
                    "kind": "LinkedField",
                    "name": "users",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v4/*: any*/)
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CourseCreateRepositoryQuery",
    "selections": (v6/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseCreateRepositoryQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "280838981a1a19548ee78146f7304cae",
    "id": null,
    "metadata": {},
    "name": "CourseCreateRepositoryQuery",
    "operationKind": "query",
    "text": "query CourseCreateRepositoryQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      name\n      organization\n      userRoles {\n        id\n        user {\n          id\n          name\n          lastName\n          file\n          notificationEmail\n        }\n        role {\n          id\n          name\n          permissions\n          isTeacher\n        }\n      }\n      groups {\n        id\n        name\n        usersByAssignments {\n          assignments {\n            id\n            title\n          }\n          users {\n            id\n            name\n            lastName\n            notificationEmail\n            file\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "eb4d547d2b2cf80cf84e4e127e6e2d2f";

export default node;
