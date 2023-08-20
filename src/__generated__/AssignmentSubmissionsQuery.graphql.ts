/**
<<<<<<< HEAD
 * @generated SignedSource<<0350d8626902e8aa4b11edfe89bd3b26>>
=======
 * @generated SignedSource<<11614becb0b49e22cbf0126fadb9c8ec>>
>>>>>>> 315412d (Compute state taking in account new states)
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
<<<<<<< HEAD
v5 = {
=======
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "AssignmentType",
  "kind": "LinkedField",
  "name": "assignments",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "assignmentId",
    "variableName": "assignmentId"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittedAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittedAgainAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pullRequestUrl",
  "storageKey": null
},
v12 = {
>>>>>>> 315412d (Compute state taking in account new states)
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assignmentId",
  "storageKey": null
},
<<<<<<< HEAD
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
=======
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v14 = {
  "kind": "InlineFragment",
>>>>>>> 315412d (Compute state taking in account new states)
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
<<<<<<< HEAD
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
=======
    (v3/*: any*/),
    (v13/*: any*/)
>>>>>>> 315412d (Compute state taking in account new states)
  ],
  "storageKey": null
},
<<<<<<< HEAD
v8 = {
=======
v15 = {
>>>>>>> 315412d (Compute state taking in account new states)
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
<<<<<<< HEAD
        (v5/*: any*/)
=======
        (v13/*: any*/)
>>>>>>> 315412d (Compute state taking in account new states)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
<<<<<<< HEAD
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewerType",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
=======
v16 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AssignmentSubmissionsQuery",
>>>>>>> 315412d (Compute state taking in account new states)
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
<<<<<<< HEAD
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
=======
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "submitter",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
>>>>>>> 315412d (Compute state taking in account new states)
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
                  (v2/*: any*/),
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
<<<<<<< HEAD
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "ae6761163bc261b981151c53eb339abc",
=======
    "selections": [
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
            "args": (v4/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              {
                "alias": "assignmentsWithSubmissions",
                "args": (v7/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignments",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SubmissionType",
                    "kind": "LinkedField",
                    "name": "submissions",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      {
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
                          (v14/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/)
                            ],
                            "type": "InternalGroupType",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "aae6c87cd35e0161207706f6c0db8db7",
>>>>>>> 315412d (Compute state taking in account new states)
    "id": null,
    "metadata": {},
    "name": "AssignmentSubmissionsQuery",
    "operationKind": "query",
<<<<<<< HEAD
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n      assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {\n        id\n        title\n        isGroup\n        submissions {\n          id\n          description\n          submittedAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              usersForAssignment {\n                id\n                name\n                lastName\n                file\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            createdAt\n            updatedAt\n          }\n        }\n        nonExistentSubmissions {\n          id\n          submitter {\n            __typename\n            ... on InternalGroupType {\n              id\n              groupName: name\n              usersForAssignment {\n                id\n                name\n                lastName\n                file\n              }\n            }\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
=======
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n      assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {\n        id\n        title\n        submissions {\n          id\n          description\n          submittedAt\n          submittedAgainAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            reviewedAt\n            reviewedAgainAt\n          }\n        }\n      }\n    }\n  }\n}\n"
>>>>>>> 315412d (Compute state taking in account new states)
  }
};
})();

<<<<<<< HEAD
(node as any).hash = "457329a0f3afd5ce66b05912534abeff";
=======
(node as any).hash = "221342b9012ac6d259d900c640f2a3be";
>>>>>>> 315412d (Compute state taking in account new states)

export default node;
