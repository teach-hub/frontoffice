/**
 * @generated SignedSource<<325608d0319f5e6bb1115ed049fd8e0f>>
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
  onlyReviewerSubmissions: boolean;
};
export type AssignmentSubmissionsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
      }>;
      readonly assignmentsWithSubmissions: ReadonlyArray<{
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly nonExistentSubmissions: ReadonlyArray<{
          readonly id: string;
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
            readonly members: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
              readonly notificationEmail: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
            readonly notificationEmail: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        }>;
        readonly nonExistentViewerSubmission: {
          readonly id: string;
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
            readonly members: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
              readonly notificationEmail: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
            readonly notificationEmail: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        } | null;
        readonly submissions: ReadonlyArray<{
          readonly assignmentId: string;
          readonly id: string;
          readonly pullRequestUrl: string;
          readonly review: {
            readonly grade: number | null;
            readonly id: string;
            readonly reviewedAgainAt: string | null;
            readonly reviewedAt: string;
            readonly revisionRequested: boolean | null;
          } | null;
          readonly reviewer: {
            readonly id: string;
            readonly reviewer: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          } | null;
          readonly submittedAgainAt: string | null;
          readonly submittedAt: string;
          readonly submitter: {
            readonly __typename: "InternalGroupType";
            readonly groupName: string | null;
            readonly id: string;
            readonly members: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
              readonly notificationEmail: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
            readonly notificationEmail: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        }>;
        readonly title: string;
        readonly viewerSubmission: {
          readonly assignmentId: string;
          readonly id: string;
          readonly pullRequestUrl: string;
          readonly review: {
            readonly grade: number | null;
            readonly id: string;
            readonly reviewedAgainAt: string | null;
            readonly reviewedAt: string;
            readonly revisionRequested: boolean | null;
          } | null;
          readonly reviewer: {
            readonly id: string;
            readonly reviewer: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          } | null;
          readonly submittedAgainAt: string | null;
          readonly submittedAt: string;
          readonly submitter: {
            readonly __typename: "InternalGroupType";
            readonly groupName: string | null;
            readonly id: string;
            readonly members: ReadonlyArray<{
              readonly file: string;
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
              readonly notificationEmail: string;
            }>;
          } | {
            readonly __typename: "UserType";
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
            readonly notificationEmail: string;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        } | null;
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "onlyReviewerSubmissions"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "file",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notificationEmail",
  "storageKey": null
},
v9 = {
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
        (v3/*: any*/),
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
          "name": "members",
          "plural": true,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/),
            (v6/*: any*/),
            (v7/*: any*/),
            (v8/*: any*/)
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
        (v3/*: any*/),
        (v7/*: any*/),
        (v4/*: any*/),
        (v6/*: any*/),
        (v8/*: any*/)
      ],
      "type": "UserType",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "ReviewerType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "reviewer",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v4/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = [
  (v3/*: any*/),
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
    "name": "submittedAgainAt",
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
  (v9/*: any*/),
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "InternalReviewType",
    "kind": "LinkedField",
    "name": "review",
    "plural": false,
    "selections": [
      (v3/*: any*/),
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
        "name": "reviewedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "reviewedAgainAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v12 = [
  (v3/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v13 = [
  {
    "kind": "Variable",
    "name": "onlyReviewerSubmissions",
    "variableName": "onlyReviewerSubmissions"
  }
],
v14 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewerType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignments",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/)
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
              (v3/*: any*/),
              (v5/*: any*/),
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
                "name": "viewerSubmission",
                "plural": false,
                "selections": (v11/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NonExistentSubmissionType",
                "kind": "LinkedField",
                "name": "nonExistentViewerSubmission",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v13/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submissions",
                "plural": true,
                "selections": (v11/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v13/*: any*/),
                "concreteType": "NonExistentSubmissionType",
                "kind": "LinkedField",
                "name": "nonExistentSubmissions",
                "plural": true,
                "selections": (v12/*: any*/),
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AssignmentSubmissionsQuery",
    "selections": (v14/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "AssignmentSubmissionsQuery",
    "selections": (v14/*: any*/)
  },
  "params": {
    "cacheID": "9a96ad1b482df0128091e16abe2262c9",
    "id": null,
    "metadata": {},
    "name": "AssignmentSubmissionsQuery",
    "operationKind": "query",
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID\n  $onlyReviewerSubmissions: Boolean!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n      assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {\n        id\n        title\n        isGroup\n        viewerSubmission {\n          id\n          submittedAt\n          submittedAgainAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              members {\n                id\n                name\n                lastName\n                file\n                notificationEmail\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n              notificationEmail\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            reviewedAt\n            reviewedAgainAt\n          }\n        }\n        nonExistentViewerSubmission {\n          id\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              members {\n                id\n                name\n                lastName\n                file\n                notificationEmail\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n              notificationEmail\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n        submissions(onlyReviewerSubmissions: $onlyReviewerSubmissions) {\n          id\n          submittedAt\n          submittedAgainAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              members {\n                id\n                name\n                lastName\n                file\n                notificationEmail\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n              notificationEmail\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            reviewedAt\n            reviewedAgainAt\n          }\n        }\n        nonExistentSubmissions(onlyReviewerSubmissions: $onlyReviewerSubmissions) {\n          id\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              members {\n                id\n                name\n                lastName\n                file\n                notificationEmail\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n              notificationEmail\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3af4c255671040915ae768bf9bfb7d18";

export default node;
