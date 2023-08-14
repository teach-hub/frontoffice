/**
 * @generated SignedSource<<f1b8f65cf05897897bc173bb4f2b24d4>>
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
            readonly file?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly name?: string;
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
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "courseId"
  }
],
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
  "name": "pullRequestUrl",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assignmentId",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v13 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file",
      "storageKey": null
    },
    (v3/*: any*/),
    (v12/*: any*/)
  ],
  "type": "UserType",
  "abstractKey": null
},
v14 = {
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
        (v12/*: any*/)
      ],
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "submitter",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v14/*: any*/),
                      (v15/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AssignmentSubmissionsQuery",
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
                          (v13/*: any*/),
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
                      (v14/*: any*/),
                      (v15/*: any*/)
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
    "cacheID": "7e1d54345df4af0f7adee17f6430a53a",
    "id": null,
    "metadata": {},
    "name": "AssignmentSubmissionsQuery",
    "operationKind": "query",
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n      assignmentsWithSubmissions: assignments(assignmentId: $assignmentId) {\n        id\n        title\n        submissions {\n          id\n          description\n          submittedAt\n          pullRequestUrl\n          assignmentId\n          submitter {\n            __typename\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n          review {\n            id\n            revisionRequested\n            grade\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5d1ae21010cad70560f94841ce551d6";

export default node;
