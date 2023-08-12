/**
 * @generated SignedSource<<432a4b72f657976a8e47198db34c059c>>
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
            readonly groupUsers: ReadonlyArray<{
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            }>;
          }>;
          readonly id: string;
          readonly isGroup: boolean | null;
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
    (v9/*: any*/)
  ],
  "type": "UserType",
  "abstractKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v1/*: any*/)
  ],
  "type": "InternalGroupType",
  "abstractKey": null
},
v12 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v9/*: any*/)
],
v13 = {
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
      "selections": (v12/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
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
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isGroup",
  "storageKey": null
},
v18 = {
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
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "UserType",
  "kind": "LinkedField",
  "name": "groupUsers",
  "plural": true,
  "selections": (v12/*: any*/),
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "submitter",
                    "plural": false,
                    "selections": [
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssignmentType",
                    "kind": "LinkedField",
                    "name": "assignment",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "InternalGroupParticipantType",
                        "kind": "LinkedField",
                        "name": "groupParticipants",
                        "plural": true,
                        "selections": [
                          (v18/*: any*/),
                          (v19/*: any*/)
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
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssignmentType",
                    "kind": "LinkedField",
                    "name": "assignment",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "InternalGroupParticipantType",
                        "kind": "LinkedField",
                        "name": "groupParticipants",
                        "plural": true,
                        "selections": [
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v1/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "447a48bce04156e6cd47046918375d4e",
    "id": null,
    "metadata": {},
    "name": "SubmissionQuery",
    "operationKind": "query",
    "text": "query SubmissionQuery(\n  $courseId: ID!\n  $submissionId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      submission(id: $submissionId) {\n        id\n        description\n        submittedAt\n        pullRequestUrl\n        viewerCanReview\n        submitter {\n          __typename\n          ... on UserType {\n            id\n            file\n            name\n            lastName\n          }\n          ... on InternalGroupType {\n            id\n          }\n        }\n        reviewer {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n        review {\n          id\n          revisionRequested\n          grade\n          createdAt\n          updatedAt\n        }\n        assignment {\n          id\n          title\n          endDate\n          isGroup\n          groupParticipants {\n            group {\n              id\n              name\n            }\n            groupUsers {\n              id\n              name\n              lastName\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "97c2ee4eadf0a86aa14ccca98a1b37d8";

export default node;
