/**
 * @generated SignedSource<<508fc41bb5764e6b69a451c7ee94bff0>>
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
        readonly alreadySubmitted: boolean;
        readonly id: string;
        readonly isGroup: boolean | null;
        readonly title: string | null;
      }>;
      readonly id: string;
      readonly viewerGroupParticipants: ReadonlyArray<{
        readonly assignmentId: string;
        readonly group: {
          readonly id: string;
          readonly name: string | null;
        };
        readonly id: string;
      }>;
    } | null;
    readonly id: string;
    readonly openPullRequests: ReadonlyArray<{
      readonly id: string;
      readonly repositoryName: string;
      readonly title: string;
      readonly url: string;
    }>;
    readonly repositories: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
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
  "name": "title",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "courseId",
    "variableName": "courseId"
  }
],
v5 = [
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
                "name": "alreadySubmitted",
                "storageKey": null
              },
              (v2/*: any*/),
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
            "alias": "viewerGroupParticipants",
            "args": null,
            "concreteType": "InternalGroupParticipantType",
            "kind": "LinkedField",
            "name": "viewerGroups",
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
                "selections": (v3/*: any*/),
                "storageKey": null
              },
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
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "RepositoryType",
        "kind": "LinkedField",
        "name": "repositories",
        "plural": true,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "UserPullRequestType",
        "kind": "LinkedField",
        "name": "openPullRequests",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
    "selections": (v5/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddSubmissionQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "1cb905da3da009e29a3e29a162cc159a",
    "id": null,
    "metadata": {},
    "name": "AddSubmissionQuery",
    "operationKind": "query",
    "text": "query AddSubmissionQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        alreadySubmitted\n        title\n        isGroup\n      }\n      viewerGroupParticipants: viewerGroups {\n        id\n        group {\n          id\n          name\n        }\n        assignmentId\n      }\n    }\n    repositories(courseId: $courseId) {\n      id\n      name\n    }\n    openPullRequests(courseId: $courseId) {\n      id\n      title\n      url\n      repositoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4117a6006b022b3d2664489448c828a";

export default node;
