/**
 * @generated SignedSource<<f0d404e74b7c40020baaec665ee0f14b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CourseSetOrganizationMutation$variables = {
  courseId: string;
  organizationName: string;
};
export type CourseSetOrganizationMutation$data = {
  readonly setOrganization: {
    readonly id: string;
    readonly organization: string | null;
  } | null;
};
export type CourseSetOrganizationMutation = {
  response: CourseSetOrganizationMutation$data;
  variables: CourseSetOrganizationMutation$variables;
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
  "name": "organizationName"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "organizationName",
        "variableName": "organizationName"
      }
    ],
    "concreteType": "CourseType",
    "kind": "LinkedField",
    "name": "setOrganization",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "organization",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CourseSetOrganizationMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CourseSetOrganizationMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "40f5e3d77df5184e1487a240fe302871",
    "id": null,
    "metadata": {},
    "name": "CourseSetOrganizationMutation",
    "operationKind": "mutation",
    "text": "mutation CourseSetOrganizationMutation(\n  $organizationName: String!\n  $courseId: ID!\n) {\n  setOrganization(organizationName: $organizationName, courseId: $courseId) {\n    id\n    organization\n  }\n}\n"
  }
};
})();

(node as any).hash = "80d2badb7c322b62b71726cd412e5d6b";

export default node;
