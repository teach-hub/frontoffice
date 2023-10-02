/**
 * @generated SignedSource<<5ae16f108afb66388bb7412f6810f08e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CourseSetDescriptionMutation$variables = {
  courseId: string;
  description: string;
};
export type CourseSetDescriptionMutation$data = {
  readonly setDescription: {
    readonly description: string | null;
    readonly id: string;
  } | null;
};
export type CourseSetDescriptionMutation = {
  response: CourseSetDescriptionMutation$data;
  variables: CourseSetDescriptionMutation$variables;
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
  "name": "description"
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
        "name": "description",
        "variableName": "description"
      }
    ],
    "concreteType": "CourseType",
    "kind": "LinkedField",
    "name": "setDescription",
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
        "name": "description",
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
    "name": "CourseSetDescriptionMutation",
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
    "name": "CourseSetDescriptionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7cfdd8acb510da72aa31b9e1d16554fe",
    "id": null,
    "metadata": {},
    "name": "CourseSetDescriptionMutation",
    "operationKind": "mutation",
    "text": "mutation CourseSetDescriptionMutation(\n  $description: String!\n  $courseId: ID!\n) {\n  setDescription(description: $description, courseId: $courseId) {\n    id\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "31b3d2ae0920745cea312ccb29184e5d";

export default node;
