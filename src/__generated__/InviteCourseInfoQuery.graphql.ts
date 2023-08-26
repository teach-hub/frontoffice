/**
 * @generated SignedSource<<232d1dde408f89a37f2ba5a3b2bbee11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type InviteCourseInfoQuery$variables = {
  inviteId: string;
};
export type InviteCourseInfoQuery$data = {
  readonly courseOfInvite: {
    readonly id: string;
    readonly name: string;
    readonly period: number;
    readonly subject: {
      readonly code: string;
      readonly id: string;
      readonly name: string;
    };
    readonly year: number;
  } | null;
};
export type InviteCourseInfoQuery = {
  response: InviteCourseInfoQuery$data;
  variables: InviteCourseInfoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inviteId"
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "inviteId",
        "variableName": "inviteId"
      }
    ],
    "concreteType": "CoursePublicDataType",
    "kind": "LinkedField",
    "name": "courseOfInvite",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
        "kind": "ScalarField",
        "name": "year",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
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
    "name": "InviteCourseInfoQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InviteCourseInfoQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3b87ef890c8d6af04b8744c96c5e87e5",
    "id": null,
    "metadata": {},
    "name": "InviteCourseInfoQuery",
    "operationKind": "query",
    "text": "query InviteCourseInfoQuery(\n  $inviteId: ID!\n) {\n  courseOfInvite(inviteId: $inviteId) {\n    id\n    name\n    period\n    year\n    subject {\n      id\n      name\n      code\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2637becd825c0499788f5b9aa2ee109d";

export default node;
