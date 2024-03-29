/**
 * @generated SignedSource<<9a8da9057ce11e8358d2de612ecdda6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CourseInfoQuery$variables = {
  courseId: string;
};
export type CourseInfoQuery$data = {
  readonly viewer: {
    readonly availableOrganizations: ReadonlyArray<{
      readonly name: string;
    }>;
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly nonExistentSubmissions: ReadonlyArray<{
          readonly id: string;
        }>;
        readonly submissions: ReadonlyArray<{
          readonly assignmentId: string;
          readonly id: string;
          readonly review: {
            readonly grade: number | null;
            readonly id: string;
            readonly revisionRequested: boolean | null;
          } | null;
          readonly submittedAt: string;
        }>;
        readonly title: string;
      }>;
      readonly description: string | null;
      readonly id: string;
      readonly name: string;
      readonly organization: string | null;
      readonly period: number;
      readonly studentsCount: number;
      readonly subject: {
        readonly id: string;
        readonly name: string;
      };
      readonly teachersCount: number;
      readonly year: number;
    } | null;
    readonly id: string;
    readonly name: string;
  } | null;
};
export type CourseInfoQuery = {
  response: CourseInfoQuery$data;
  variables: CourseInfoQuery$variables;
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
v3 = [
  {
    "kind": "Literal",
    "name": "onlyReviewerSubmissions",
    "value": false
  }
],
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
      (v2/*: any*/),
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
            "name": "organization",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "studentsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "teachersCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "period",
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
                "kind": "ScalarField",
                "name": "title",
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
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submissions",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
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
                    "name": "assignmentId",
                    "storageKey": null
                  },
                  {
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
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "submissions(onlyReviewerSubmissions:false)"
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "NonExistentSubmissionType",
                "kind": "LinkedField",
                "name": "nonExistentSubmissions",
                "plural": true,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": "nonExistentSubmissions(onlyReviewerSubmissions:false)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SubjectType",
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GithubOrganizationType",
        "kind": "LinkedField",
        "name": "availableOrganizations",
        "plural": true,
        "selections": [
          (v2/*: any*/)
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
    "name": "CourseInfoQuery",
    "selections": (v4/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CourseInfoQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "05fee33dde596218fb3cac77f125ecff",
    "id": null,
    "metadata": {},
    "name": "CourseInfoQuery",
    "operationKind": "query",
    "text": "query CourseInfoQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    name\n    course(id: $courseId) {\n      id\n      name\n      description\n      organization\n      studentsCount\n      teachersCount\n      year\n      period\n      assignments {\n        id\n        title\n        isGroup\n        submissions(onlyReviewerSubmissions: false) {\n          id\n          submittedAt\n          assignmentId\n          review {\n            id\n            revisionRequested\n            grade\n          }\n        }\n        nonExistentSubmissions(onlyReviewerSubmissions: false) {\n          id\n        }\n      }\n      subject {\n        id\n        name\n      }\n    }\n    availableOrganizations {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "062ffebf3edc7fa40dfac147edc13227";

export default node;
