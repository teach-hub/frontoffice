/**
<<<<<<< HEAD
 * @generated SignedSource<<e241802ddf389274a7ee24073efb5cb2>>
=======
 * @generated SignedSource<<ebff2327ea31c68a125b79e3cf47b33a>>
>>>>>>> fe151f1 (Query group fields)
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionQuery$variables = {
  courseId: string;
  submissionId: string;
};
export type SubmissionQuery$data = {
  readonly viewer: {
    readonly course: {
<<<<<<< HEAD
      readonly id: string;
      readonly submission: {
        readonly assignment: {
          readonly endDate: string | null;
          readonly id: string;
          readonly title: string | null;
        } | null;
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
=======
      readonly assignment: {
        readonly endDate: string | null;
        readonly groupParticipants: ReadonlyArray<{
          readonly group: {
            readonly id: string;
            readonly name: string | null;
          };
          readonly groupUsers: ReadonlyArray<{
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          }>;
        }>;
        readonly id: string;
        readonly submission: {
          readonly description: string | null;
>>>>>>> fe151f1 (Query group fields)
          readonly id: string;
          readonly reviewer: {
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          };
        } | null;
        readonly submittedAt: string;
        readonly submitter: {
          readonly file?: string;
          readonly id?: string;
          readonly lastName?: string;
          readonly name?: string;
        };
        readonly viewerCanReview: boolean;
      } | null;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type SubmissionQuery = {
  response: SubmissionQuery$data;
  variables: SubmissionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "courseId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "submissionId"
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
    "kind": "Variable",
    "name": "id",
    "variableName": "courseId"
  }
],
<<<<<<< HEAD
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "submissionId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittedAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pullRequestUrl",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanReview",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v10 = {
=======
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "assignmentId"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "InternalGroupType",
  "kind": "LinkedField",
  "name": "group",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v11 = [
  (v3/*: any*/),
  (v4/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "groupUsers",
  "plural": true,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "submissionId"
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittedAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pullRequestUrl",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanReview",
  "storageKey": null
},
v18 = {
>>>>>>> fe151f1 (Query group fields)
  "kind": "InlineFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file",
      "storageKey": null
    },
<<<<<<< HEAD
    (v2/*: any*/),
    (v9/*: any*/)
=======
    (v4/*: any*/),
    (v10/*: any*/)
>>>>>>> fe151f1 (Query group fields)
  ],
  "type": "UserType",
  "abstractKey": null
},
<<<<<<< HEAD
v11 = {
=======
v19 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "InternalGroupType",
  "abstractKey": null
},
v20 = {
>>>>>>> fe151f1 (Query group fields)
  "alias": null,
  "args": null,
  "concreteType": "ReviewerType",
  "kind": "LinkedField",
  "name": "reviewer",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "reviewer",
      "plural": false,
<<<<<<< HEAD
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
        (v9/*: any*/)
      ],
=======
      "selections": (v11/*: any*/),
>>>>>>> fe151f1 (Query group fields)
      "storageKey": null
    }
  ],
  "storageKey": null
},
<<<<<<< HEAD
v12 = {
=======
v21 = {
>>>>>>> fe151f1 (Query group fields)
  "alias": null,
  "args": null,
  "concreteType": "InternalReviewType",
  "kind": "LinkedField",
  "name": "review",
  "plural": false,
  "selections": [
    (v1/*: any*/),
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
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "AssignmentType",
  "kind": "LinkedField",
  "name": "assignment",
  "plural": false,
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
      "name": "endDate",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmissionQuery",
    "selections": [
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
            "args": (v3/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submission",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
<<<<<<< HEAD
                    "concreteType": null,
=======
                    "concreteType": "InternalGroupParticipantType",
                    "kind": "LinkedField",
                    "name": "groupParticipants",
                    "plural": true,
                    "selections": [
                      (v9/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v13/*: any*/),
                    "concreteType": "SubmissionType",
>>>>>>> fe151f1 (Query group fields)
                    "kind": "LinkedField",
                    "name": "submitter",
                    "plural": false,
                    "selections": [
<<<<<<< HEAD
                      (v10/*: any*/)
=======
                      (v3/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "submitter",
                        "plural": false,
                        "selections": [
                          (v18/*: any*/),
                          (v19/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v20/*: any*/),
                      (v21/*: any*/)
>>>>>>> fe151f1 (Query group fields)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/)
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
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionQuery",
    "selections": [
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
            "args": (v3/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submission",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
<<<<<<< HEAD
                    "concreteType": null,
=======
                    "concreteType": "InternalGroupParticipantType",
                    "kind": "LinkedField",
                    "name": "groupParticipants",
                    "plural": true,
                    "selections": [
                      (v9/*: any*/),
                      (v12/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v13/*: any*/),
                    "concreteType": "SubmissionType",
>>>>>>> fe151f1 (Query group fields)
                    "kind": "LinkedField",
                    "name": "submitter",
                    "plural": false,
                    "selections": [
<<<<<<< HEAD
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "InternalGroupType",
                        "abstractKey": null
                      }
=======
                      (v3/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
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
                          (v18/*: any*/),
                          (v19/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v20/*: any*/),
                      (v21/*: any*/)
>>>>>>> fe151f1 (Query group fields)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/)
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
<<<<<<< HEAD
    "cacheID": "0b9fd3ec72fad5129fcb383a50ddf7b5",
=======
    "cacheID": "464f12dada428204df3dc59c5a9b12f2",
>>>>>>> fe151f1 (Query group fields)
    "id": null,
    "metadata": {},
    "name": "SubmissionQuery",
    "operationKind": "query",
<<<<<<< HEAD
    "text": "query SubmissionQuery(\n  $courseId: ID!\n  $submissionId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      submission(id: $submissionId) {\n        id\n        description\n        submittedAt\n        pullRequestUrl\n        viewerCanReview\n        submitter {\n          __typename\n          ... on UserType {\n            id\n            file\n            name\n            lastName\n          }\n          ... on InternalGroupType {\n            id\n          }\n        }\n        reviewer {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n        review {\n          id\n          revisionRequested\n          grade\n          createdAt\n          updatedAt\n        }\n        assignment {\n          id\n          title\n          endDate\n        }\n      }\n    }\n  }\n}\n"
=======
    "text": "query SubmissionQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n  $submissionId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignment(id: $assignmentId) {\n        id\n        title\n        endDate\n        groupParticipants {\n          group {\n            id\n            name\n          }\n          groupUsers {\n            id\n            name\n            lastName\n          }\n          id\n        }\n        submission(id: $submissionId) {\n          id\n          description\n          submittedAt\n          pullRequestUrl\n          viewerCanReview\n          submitter {\n            __typename\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n}\n"
>>>>>>> fe151f1 (Query group fields)
  }
};
})();

<<<<<<< HEAD
(node as any).hash = "4801001e943daab6e692212c93e48e5f";
=======
(node as any).hash = "4e18c9c485547c6bd7ce6b22bbd1fd36";
>>>>>>> fe151f1 (Query group fields)

export default node;
