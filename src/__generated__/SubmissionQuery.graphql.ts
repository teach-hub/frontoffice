/**
 * @generated SignedSource<<b6cf734bf66db865058a59cf41ad9ff4>>
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
      readonly id: string;
      readonly submission: {
        readonly assignment: {
          readonly endDate: string | null;
          readonly groupParticipants: ReadonlyArray<{
            readonly group: {
              readonly id: string;
              readonly name: string | null;
            };
            readonly user: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          }>;
          readonly id: string;
          readonly isGroup: boolean | null;
          readonly title: string | null;
        } | null;
        readonly comments: ReadonlyArray<{
          readonly body: string | null;
          readonly createdAt: string | null;
          readonly githubUserId: string | null;
          readonly githubUsername: string | null;
          readonly id: string | null;
          readonly updatedAt: string | null;
        }>;
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
          readonly file?: string;
          readonly id?: string;
          readonly lastName?: string;
          readonly name?: string;
        };
        readonly viewerIsReviewer: boolean;
      } | null;
    } | null;
    readonly githubId: string;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "githubId",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "courseId"
  }
],
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "submissionId"
  }
],
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
  "name": "submittedAgainAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pullRequestUrl",
  "storageKey": null
},
v9 = {
  "alias": "viewerIsReviewer",
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanReview",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v11 = {
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
    (v2/*: any*/),
    (v10/*: any*/)
  ],
  "type": "UserType",
  "abstractKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    (v1/*: any*/)
  ],
  "type": "InternalGroupType",
  "abstractKey": null
},
v13 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v10/*: any*/)
],
v14 = {
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
      "selections": (v13/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
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
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isGroup",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "InternalGroupType",
  "kind": "LinkedField",
  "name": "group",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Comment",
  "kind": "LinkedField",
  "name": "comments",
  "plural": true,
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "githubUserId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "githubUsername",
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submission",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "submitter",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssignmentType",
                    "kind": "LinkedField",
                    "name": "assignment",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "InternalGroupParticipantType",
                        "kind": "LinkedField",
                        "name": "groupParticipants",
                        "plural": true,
                        "selections": [
                          (v19/*: any*/),
                          (v20/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v21/*: any*/)
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "CourseType",
            "kind": "LinkedField",
            "name": "course",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submission",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
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
                      (v11/*: any*/),
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssignmentType",
                    "kind": "LinkedField",
                    "name": "assignment",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "InternalGroupParticipantType",
                        "kind": "LinkedField",
                        "name": "groupParticipants",
                        "plural": true,
                        "selections": [
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v21/*: any*/)
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
    "cacheID": "6bfe2c1be042e985338c40709651176d",
    "id": null,
    "metadata": {},
    "name": "SubmissionQuery",
    "operationKind": "query",
    "text": "query SubmissionQuery(\n  $courseId: ID!\n  $submissionId: ID!\n) {\n  viewer {\n    id\n    name\n    githubId\n    course(id: $courseId) {\n      id\n      submission(id: $submissionId) {\n        id\n        submittedAt\n        submittedAgainAt\n        pullRequestUrl\n        viewerIsReviewer: viewerCanReview\n        submitter {\n          __typename\n          ... on UserType {\n            id\n            file\n            name\n            lastName\n          }\n          ... on InternalGroupType {\n            id\n          }\n        }\n        reviewer {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n        review {\n          id\n          revisionRequested\n          grade\n          reviewedAt\n          reviewedAgainAt\n        }\n        assignment {\n          id\n          title\n          endDate\n          isGroup\n          groupParticipants {\n            group {\n              id\n              name\n            }\n            user {\n              id\n              name\n              lastName\n            }\n            id\n          }\n        }\n        comments {\n          id\n          body\n          createdAt\n          updatedAt\n          githubUserId\n          githubUsername\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4de4f9fac2f26edbd959fe0592576147";

export default node;
