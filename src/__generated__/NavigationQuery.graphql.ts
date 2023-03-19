/**
 * @generated SignedSource<<a67c39d39337053d778e66dc48cc3492>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationQuery$variables = {
  courseId: number;
  shouldFetchCourseInfo: boolean;
};
export type NavigationQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"NavigationCourseInfo">;
  } | null;
};
export type NavigationQuery = {
  response: NavigationQuery$data;
  variables: NavigationQuery$variables;
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
    "name": "shouldFetchCourseInfo"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NavigationQuery",
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
            "condition": "shouldFetchCourseInfo",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NavigationCourseInfo"
              }
            ]
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
    "name": "NavigationQuery",
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
            "condition": "shouldFetchCourseInfo",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
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
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7bdf03eaedee46b8b74bd5fe386619e0",
    "id": null,
    "metadata": {},
    "name": "NavigationQuery",
    "operationKind": "query",
    "text": "query NavigationQuery(\n  $courseId: Int!\n  $shouldFetchCourseInfo: Boolean!\n) {\n  viewer {\n    id\n    name\n    ...NavigationCourseInfo @include(if: $shouldFetchCourseInfo)\n  }\n}\n\nfragment NavigationCourseInfo on ViewerType {\n  findCourse(id: $courseId) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "06ac79ec67d7f3a67262b178ff2a296c";

export default node;
