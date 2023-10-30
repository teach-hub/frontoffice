/**
 * @generated SignedSource<<185d537dfa5c579b86083ed054563b47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AddSubmissionQuery$variables = {
  courseId: string;
};
export type AddSubmissionQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly isOpenForSubmissions: boolean;
        readonly title: string;
        readonly viewerReviewer: {
          readonly id: string;
          readonly reviewer: {
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          };
        } | null;
        readonly viewerSubmission: {
          readonly id: string;
        } | null;
      }>;
      readonly id: string;
      readonly viewerGroupParticipants: ReadonlyArray<{
        readonly group: {
          readonly assignmentId: string;
          readonly id: string;
          readonly name: string | null;
        };
        readonly id: string;
      }>;
      readonly viewerRepositories: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
      }>;
    } | null;
    readonly id: string;
    readonly openPullRequests: ReadonlyArray<{
      readonly id: string;
      readonly repositoryName: string;
      readonly title: string;
      readonly url: string;
    }>;
  } | null;
};
export type AddSubmissionQuery = {
  response: AddSubmissionQuery$data;
  variables: AddSubmissionQuery$variables;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
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
            "concreteType": "RepositoryType",
            "kind": "LinkedField",
            "name": "viewerRepositories",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "viewerSubmission",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ReviewerType",
                "kind": "LinkedField",
                "name": "viewerReviewer",
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
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isOpenForSubmissions",
                "storageKey": null
              },
              (v3/*: any*/),
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
            "name": "viewerGroupParticipants",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "InternalGroupType",
                "kind": "LinkedField",
                "name": "group",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "assignmentId",
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
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "courseId",
            "variableName": "courseId"
          }
        ],
        "concreteType": "UserPullRequestType",
        "kind": "LinkedField",
        "name": "openPullRequests",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "repositoryName",
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
    "name": "AddSubmissionQuery",
    "selections": (v4/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddSubmissionQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "a9c8beb32df962d257eea19fedea642e",
    "id": null,
    "metadata": {},
    "name": "AddSubmissionQuery",
    "operationKind": "query",
    "text": "query AddSubmissionQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      viewerRepositories {\n        id\n        name\n      }\n      assignments {\n        id\n        viewerSubmission {\n          id\n        }\n        viewerReviewer {\n          id\n          reviewer {\n            id\n            name\n            lastName\n          }\n        }\n        isOpenForSubmissions\n        title\n        isGroup\n      }\n      viewerGroupParticipants {\n        id\n        group {\n          id\n          name\n          assignmentId\n        }\n      }\n    }\n    openPullRequests(courseId: $courseId) {\n      id\n      title\n      url\n      repositoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "54c2ec6d10e60a94e6fe87f62225532a";

export default node;
