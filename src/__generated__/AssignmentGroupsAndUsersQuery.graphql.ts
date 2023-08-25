/**
 * @generated SignedSource<<96969f80d8cd742588e0b5712526fae8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentGroupsAndUsersQuery$variables = {
  assignmentId?: string | null;
  courseId: string;
};
export type AssignmentGroupsAndUsersQuery$data = {
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
          readonly userRoleId: string;
        }>;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly title: string | null;
      }>;
      readonly id: string;
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
export type AssignmentGroupsAndUsersQuery = {
  response: AssignmentGroupsAndUsersQuery$data;
  variables: AssignmentGroupsAndUsersQuery$variables;
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
                "kind": "ScalarField",
                "name": "isGroup",
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
                    "kind": "ScalarField",
                    "name": "userRoleId",
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
    "name": "AssignmentGroupsAndUsersQuery",
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
    "name": "AssignmentGroupsAndUsersQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "0cd86b51a2cbdb3c67b20bdc88dace1e",
    "id": null,
    "metadata": {},
    "name": "AssignmentGroupsAndUsersQuery",
    "operationKind": "query",
    "text": "query AssignmentGroupsAndUsersQuery(\n  $courseId: ID!\n  $assignmentId: ID\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      organization\n      userRoles {\n        id\n        user {\n          id\n          name\n          lastName\n          file\n          notificationEmail\n        }\n        role {\n          id\n          name\n          permissions\n          isTeacher\n        }\n      }\n      assignments(assignmentId: $assignmentId) {\n        id\n        title\n        isGroup\n        groupParticipants {\n          id\n          group {\n            id\n            name\n          }\n          userRoleId\n          user {\n            id\n            name\n            lastName\n            file\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b98fd904e1162ea1395c773aaa051132";

export default node;
