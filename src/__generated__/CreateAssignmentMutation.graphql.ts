/**
 * @generated SignedSource<<ed269e744e2b7c8133d24ba9efcbc4ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAssignmentMutation$variables = {
  allowLateSubmissions?: boolean | null;
  courseId: string;
  description?: string | null;
  endDate?: string | null;
  link?: string | null;
  startDate?: string | null;
  title?: string | null;
};
export type CreateAssignmentMutation$data = {
  readonly createAssignment: {
    readonly allowLateSubmissions: boolean | null;
    readonly courseId: string | null;
    readonly description: string | null;
    readonly endDate: string | null;
    readonly id: string;
    readonly link: string | null;
    readonly startDate: string | null;
    readonly title: string | null;
  } | null;
};
export type CreateAssignmentMutation = {
  response: CreateAssignmentMutation$data;
  variables: CreateAssignmentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "allowLateSubmissions"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "endDate"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "link"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "allowLateSubmissions",
        "variableName": "allowLateSubmissions"
      },
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "endDate",
        "variableName": "endDate"
      },
      {
        "kind": "Variable",
        "name": "link",
        "variableName": "link"
      },
      {
        "kind": "Variable",
        "name": "startDate",
        "variableName": "startDate"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "AssignmentType",
    "kind": "LinkedField",
    "name": "createAssignment",
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
        "name": "title",
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
        "name": "startDate",
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
        "name": "allowLateSubmissions",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "courseId",
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
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAssignmentMutation",
    "selections": (v7/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v6/*: any*/),
      (v2/*: any*/),
      (v5/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateAssignmentMutation",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "eaed1b3758d074b11184b253db1db90f",
    "id": null,
    "metadata": {},
    "name": "CreateAssignmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAssignmentMutation(\n  $title: String\n  $description: String\n  $startDate: String\n  $endDate: String\n  $link: String\n  $allowLateSubmissions: Boolean\n  $courseId: String!\n) {\n  createAssignment(title: $title, description: $description, startDate: $startDate, endDate: $endDate, link: $link, allowLateSubmissions: $allowLateSubmissions, courseId: $courseId) {\n    id\n    title\n    description\n    startDate\n    endDate\n    link\n    allowLateSubmissions\n    courseId\n  }\n}\n"
  }
};
})();

(node as any).hash = "f1e89e8e4e8ee420b1c24a38e304be93";

export default node;
