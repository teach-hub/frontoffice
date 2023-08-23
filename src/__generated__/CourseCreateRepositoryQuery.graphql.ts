/**
 * @generated SignedSource<<773ac31d71a3f297d07316b342184732>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseCreateRepositoryQuery$variables = {
  assignmentId: string;
  courseId: string;
};
export type CourseCreateRepositoryQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly groupParticipants: ReadonlyArray<{
          readonly group: {
            readonly id: string;
            readonly name: string | null;
          };
          readonly id: string;
          readonly user: {
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          };
        }>;
        readonly id: string;
        readonly title: string | null;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignmentId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file",
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
      (v2/*: any*/),
      (v3/*: any*/),
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
          (v2/*: any*/),
          (v3/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "UserType",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/),
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
            "args": [
              {
                "kind": "Variable",
                "name": "assignmentId",
                "variableName": "assignmentId"
              }
            ],
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignments",
            "plural": true,
            "selections": [
              (v2/*: any*/),
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
                "concreteType": "InternalGroupParticipantType",
                "kind": "LinkedField",
                "name": "groupParticipants",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "InternalGroupType",
                    "kind": "LinkedField",
                    "name": "group",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserType",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CourseCreateRepositoryQuery",
    "selections": (v6/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CourseCreateRepositoryQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "84fb6a98cf2807ca07eed8c7c483155c",
    "id": null,
    "metadata": {},
    "name": "CourseCreateRepositoryQuery",
    "operationKind": "query",
    "text": "query CourseCreateRepositoryQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      name\n      organization\n      userRoles {\n        id\n        user {\n          id\n          name\n          lastName\n          file\n          notificationEmail\n        }\n        role {\n          id\n          name\n          permissions\n          isTeacher\n        }\n      }\n      assignments(assignmentId: $assignmentId) {\n        id\n        title\n        groupParticipants {\n          id\n          group {\n            id\n            name\n          }\n          user {\n            id\n            name\n            lastName\n            file\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d9889486894f6713275693eb3eec301b";

export default node;
