/**
 * @generated SignedSource<<190a1fa5599b5891b02886a1c6ff5bd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserCourseGroupsQuery$variables = {
  courseId: string;
};
export type UserCourseGroupsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly title: string | null;
      }>;
      readonly groups: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
      }>;
      readonly id: string;
      readonly viewerGroups: ReadonlyArray<{
        readonly assignmentId: string;
        readonly group: {
          readonly id: string;
          readonly name: string | null;
        };
        readonly groupUsers: ReadonlyArray<{
          readonly file: string;
          readonly id: string;
          readonly lastName: string;
          readonly name: string;
          readonly notificationEmail: string;
        }>;
        readonly id: string;
      }>;
    } | null;
    readonly id: string;
  } | null;
};
export type UserCourseGroupsQuery = {
  response: UserCourseGroupsQuery$data;
  variables: UserCourseGroupsQuery$variables;
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
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isGroup",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InternalGroupParticipantType",
            "kind": "LinkedField",
            "name": "viewerGroups",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "assignmentId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "InternalGroupType",
                "kind": "LinkedField",
                "name": "group",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserType",
                "kind": "LinkedField",
                "name": "groupUsers",
                "plural": true,
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
                    "name": "notificationEmail",
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
            "selections": (v3/*: any*/),
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
    "name": "UserCourseGroupsQuery",
    "selections": (v4/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserCourseGroupsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "5ddede8801f768f4107a82306b3c46d3",
    "id": null,
    "metadata": {},
    "name": "UserCourseGroupsQuery",
    "operationKind": "query",
    "text": "query UserCourseGroupsQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n        isGroup\n      }\n      viewerGroups {\n        id\n        assignmentId\n        group {\n          id\n          name\n        }\n        groupUsers {\n          id\n          name\n          lastName\n          notificationEmail\n          file\n        }\n      }\n      groups {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0085e7f9240d881e1863432a4dcb84d6";

export default node;
