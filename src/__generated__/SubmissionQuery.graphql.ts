/**
 * @generated SignedSource<<1958fc0083d84bb49010953052f8cb91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SubmissionQuery$variables = {
  assignmentId: string;
  courseId: string;
  submissionId: string;
};
export type SubmissionQuery$data = {
  readonly viewer: {
    readonly findCourse: {
      readonly findAssignment: {
        readonly id: string;
        readonly submission: {
          readonly description: string | null;
          readonly id: string;
          readonly submittedAt: string;
          readonly user: {
            readonly file: string;
            readonly id: string;
            readonly lastName: string;
            readonly name: string;
          };
        } | null;
      } | null;
      readonly id: string;
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
  "name": "submissionId"
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
v5 = [
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
        "name": "findCourse",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "assignmentId"
              }
            ],
            "concreteType": "AssignmentType",
            "kind": "LinkedField",
            "name": "findAssignment",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "submissionId"
                  }
                ],
                "concreteType": "SubmissionType",
                "kind": "LinkedField",
                "name": "submission",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                    "concreteType": "UserType",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "file",
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
    "name": "SubmissionQuery",
    "selections": (v5/*: any*/),
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
    "name": "SubmissionQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "46111a2741bd227f01243a96f4b15db4",
    "id": null,
    "metadata": {},
    "name": "SubmissionQuery",
    "operationKind": "query",
    "text": "query SubmissionQuery(\n  $courseId: String!\n  $assignmentId: String!\n  $submissionId: ID!\n) {\n  viewer {\n    id\n    name\n    findCourse(id: $courseId) {\n      id\n      findAssignment(id: $assignmentId) {\n        id\n        submission(id: $submissionId) {\n          id\n          description\n          submittedAt\n          user {\n            id\n            file\n            name\n            lastName\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "12db735b4d1a05734112449adc7b5c83";

export default node;
