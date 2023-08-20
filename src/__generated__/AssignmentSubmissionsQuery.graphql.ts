/**
 * @generated SignedSource<<cc45014cbab1acd2e5344ff7bf4b1606>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentSubmissionsQuery$variables = {
  assignmentId?: string | null;
  courseId: string;
};
export type AssignmentSubmissionsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly title: string | null;
      }>;
      readonly assignmentsWithSubmissions: ReadonlyArray<{
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly nonExistentSubmissions: ReadonlyArray<{
          readonly reviewer: {
            readonly id: string;
            readonly reviewer: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          } | null;
          readonly submitter: {
            readonly __typename: "InternalGroupType";
            readonly groupName: string | null;
            readonly id: string;
            readonly usersForAssignment: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        }>;
        readonly submissions: ReadonlyArray<{
          readonly assignmentId: string;
          readonly description: string | null;
          readonly id: string;
          readonly pullRequestUrl: string;
          readonly review: {
            readonly createdAt: string;
            readonly grade: number | null;
            readonly id: string;
            readonly revisionRequested: boolean | null;
            readonly updatedAt: string;
          } | null;
          readonly reviewer: {
            readonly id: string;
            readonly reviewer: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          } | null;
          readonly submittedAt: string;
          readonly submitter: {
            readonly __typename: "InternalGroupType";
            readonly groupName: string | null;
            readonly id: string;
            readonly usersForAssignment: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        }>;
        readonly title: string | null;
      }>;
      readonly id: string;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type AssignmentSubmissionsQuery = {
  response: AssignmentSubmissionsQuery$data;
  variables: AssignmentSubmissionsQuery$variables;
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
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "submitter",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        {
          "alias": "groupName",
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserType",
          "kind": "LinkedField",
          "name": "usersForAssignment",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            (v5/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "InternalGroupType",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v6/*: any*/),
        (v3/*: any*/),
        (v5/*: any*/)
      ],
      "type": "UserType",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ReviewerType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "reviewer",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = [
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
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignments",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "assignmentsWithSubmissions",
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
              (v4/*: any*/),
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
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submissions",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "submittedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "pullRequestUrl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "assignmentId",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "InternalReviewType",
                    "kind": "LinkedField",
                    "name": "review",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "revisionRequested",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "grade",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
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
                "concreteType": "NonExistentSubmissionType",
                "kind": "LinkedField",
                "name": "nonExistentSubmissions",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/)
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
    "name": "AssignmentSubmissionsQuery",
    "selections": (v9/*: any*/),
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
    "name": "AssignmentSubmissionsQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "b7d804a0d1f4dbb5bf7eb18a74f8e514",
    "id": null,
    "metadata": {},
    "name": "AssignmentSubmissionsQuery",
    "operationKind": "query",
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n      assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {\n        id\n        title\n        isGroup\n        submissions {\n          id\n          description\n          submittedAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              usersForAssignment {\n                id\n                name\n                lastName\n                file\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            createdAt\n            updatedAt\n          }\n        }\n        nonExistentSubmissions {\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              usersForAssignment {\n                id\n                name\n                lastName\n                file\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a5bf9be9deebb76429d6388ec41df02c";

export default node;
