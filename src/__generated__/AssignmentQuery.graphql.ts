/**
 * @generated SignedSource<<67ec3b8deb475e2429984b5a80cdd325>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AssignmentQuery$variables = {
  id: string;
};
export type AssignmentQuery$data = {
  readonly viewer: {
    readonly assignment: {
      readonly active: boolean | null;
      readonly allowLateSubmissions: boolean | null;
      readonly courseId: string;
      readonly description: string | null;
      readonly endDate: string | null;
      readonly id: string;
      readonly link: string | null;
      readonly startDate: string | null;
      readonly title: string | null;
    } | null;
    readonly id: string;
  } | null;
};
export type AssignmentQuery = {
  response: AssignmentQuery$data;
  variables: AssignmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
            "variableName": "id"
          }
        ],
        "concreteType": "AssignmentType",
        "kind": "LinkedField",
        "name": "assignment",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "name": "courseId",
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
            "name": "endDate",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "active",
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
    "name": "AssignmentQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AssignmentQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "74146bf1ad7c18998bf282b02119c85c",
    "id": null,
    "metadata": {},
    "name": "AssignmentQuery",
    "operationKind": "query",
    "text": "query AssignmentQuery(\n  $id: ID!\n) {\n  viewer {\n    id\n    assignment(id: $id) {\n      id\n      allowLateSubmissions\n      courseId\n      description\n      endDate\n      link\n      startDate\n      title\n      active\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ab332a50f35f5a86267aa0acfada370";

export default node;
