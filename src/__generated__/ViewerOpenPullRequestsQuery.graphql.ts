/**
 * @generated SignedSource<<d2ecdc3c4a97f39fc7b9dc417a1d0f45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ViewerOpenPullRequestsQuery$variables = {
  courseId: string;
};
export type ViewerOpenPullRequestsQuery$data = {
  readonly viewer: {
    readonly course: {
      readonly assignments: ReadonlyArray<{
        readonly id: string;
        readonly title: string | null;
      }>;
      readonly id: string;
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
export type ViewerOpenPullRequestsQuery = {
  response: ViewerOpenPullRequestsQuery$data;
  variables: ViewerOpenPullRequestsQuery$variables;
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
  {
    "kind": "Variable",
    "name": "courseId",
    "variableName": "courseId"
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "RepositoryType",
        "kind": "LinkedField",
        "name": "repositories",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
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
    "name": "ViewerOpenPullRequestsQuery",
    "selections": (v4/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewerOpenPullRequestsQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "4ab4295b80d51091fb357c790cfd1093",
    "id": null,
    "metadata": {},
    "name": "ViewerOpenPullRequestsQuery",
    "operationKind": "query",
    "text": "query ViewerOpenPullRequestsQuery(\n  $courseId: ID!\n) {\n  viewer {\n    id\n    course(id: $courseId) {\n      id\n      assignments {\n        id\n        title\n      }\n    }\n    repositories(courseId: $courseId) {\n      id\n      name\n    }\n    openPullRequests(courseId: $courseId) {\n      id\n      title\n      url\n      repositoryName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f65cc428da9505d94af2aef3097364a2";

export default node;
