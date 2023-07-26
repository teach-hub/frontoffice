/**
 * @generated SignedSource<<bc5d22a7ce93effad765e437861f616e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentSubmissionsQuery$variables = {
  assignmentId: string;
  courseId: string;
};
export type AssignmentSubmissionsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignment: {
        readonly id: string;
        readonly submissions: ReadonlyArray<{
          readonly description: string | null;
          readonly id: string;
          readonly pullRequestUrl: string;
          readonly submitee: {
            readonly file?: string;
            readonly id?: string;
            readonly lastName?: string;
            readonly name?: string;
          };
          readonly submittedAt: string;
        }>;
      } | null;
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
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "assignmentId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "submittedAt",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    }
  ],
  "type": "UserType",
  "abstractKey": null
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
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SubmissionType",
                    "kind": "LinkedField",
                    "name": "submissions",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "submitee",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/)
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
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "AssignmentType",
                "kind": "LinkedField",
                "name": "assignment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SubmissionType",
                    "kind": "LinkedField",
                    "name": "submissions",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "submitee",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          (v9/*: any*/),
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
    "cacheID": "bceb8b9a4334883d879dda836e0d6b2a",
    "id": null,
    "metadata": {},
    "name": "AssignmentSubmissionsQuery",
    "operationKind": "query",
    "text": "query AssignmentSubmissionsQuery(\n  $courseId: ID!\n  $assignmentId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      assignment(id: $assignmentId) {\n        id\n        submissions {\n          id\n          description\n          submittedAt\n          pullRequestUrl\n          submitee {\n            __typename\n            ... on UserType {\n              id\n              file\n              name\n              lastName\n            }\n            ... on InternalGroupType {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd5c5ece382c63d84625c60b05aaa483";

export default node;
