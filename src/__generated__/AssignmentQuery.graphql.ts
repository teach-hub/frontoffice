/**
 * @generated SignedSource<<886f6e490a90406be92e31696e108e1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentQuery$variables = {
  courseId: string;
  id: string;
  includeSubmissions: boolean;
};
export type AssignmentQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly allowLateSubmissions: boolean | null;
        readonly description: string | null;
        readonly endDate: string | null;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly isOpenForSubmissions: boolean;
        readonly link: string | null;
        readonly nonExistentSubmissions?: ReadonlyArray<{
          readonly id: string;
          readonly reviewer: {
            readonly id: string;
            readonly reviewer: {
              readonly id: string;
              readonly lastName: string;
              readonly name: string;
            };
          } | null;
        }>;
        readonly startDate: string | null;
        readonly submissions?: ReadonlyArray<{
          readonly id: string;
          readonly review: {
            readonly grade: number | null;
            readonly id: string;
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
        }>;
        readonly title: string;
        readonly viewerSubmission: {
          readonly id: string;
        } | null;
      } | null;
      readonly id: string;
    } | null;
    readonly id: string;
  } | null;
};
export type AssignmentQuery = {
  response: AssignmentQuery$data;
  variables: AssignmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeSubmissions"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "onlyReviewerSubmissions",
    "value": false
  }
],
v5 = {
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "id"
              }
            ],
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "assignment",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "viewerSubmission",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowLateSubmissions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isOpenForSubmissions",
                "storageKey": null
              },
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
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "link",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
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
                "condition": "includeSubmissions",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "SubmissionType",
                    "kind": "LinkedField",
                    "name": "submissions",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": "submissions(onlyReviewerSubmissions:false)"
                  },
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "concreteType": "NonExistentSubmissionType",
                    "kind": "LinkedField",
                    "name": "nonExistentSubmissions",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": "nonExistentSubmissions(onlyReviewerSubmissions:false)"
                  }
                ]
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
    "name": "AssignmentQuery",
    "selections": (v6/*: any*/),
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
    "name": "AssignmentQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "8c2e7a46e61c96f92d30b162e049fd77",
    "id": null,
    "metadata": {},
    "name": "AssignmentQuery",
    "operationKind": "query",
    "text": "query AssignmentQuery(\n  $id: ID!\n  $courseId: ID!\n  $includeSubmissions: Boolean!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignment(id: $id) {\n        id\n        viewerSubmission {\n          id\n        }\n        allowLateSubmissions\n        isOpenForSubmissions\n        title\n        description\n        link\n        startDate\n        endDate\n        isGroup\n        submissions(onlyReviewerSubmissions: false) @include(if: $includeSubmissions) {\n          id\n          review {\n            id\n            revisionRequested\n            grade\n          }\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n        nonExistentSubmissions(onlyReviewerSubmissions: false) @include(if: $includeSubmissions) {\n          id\n          reviewer {\n            id\n            reviewer {\n              id\n              name\n              lastName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "742e9e46f08d162fa5842a8c39fc6ee2";

export default node;
