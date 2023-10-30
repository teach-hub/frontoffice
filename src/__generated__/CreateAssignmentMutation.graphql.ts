/**
 * @generated SignedSource<<917c784097e31f74aeea94c188af3cdd>>
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
  isGroup?: boolean | null;
  link?: string | null;
  startDate?: string | null;
  title: string;
};
export type CreateAssignmentMutation$data = {
  readonly createAssignment: {
    readonly allowLateSubmissions: boolean | null;
    readonly courseId: string;
    readonly description: string | null;
    readonly endDate: string | null;
    readonly id: string;
    readonly isGroup: boolean | null;
    readonly link: string | null;
    readonly startDate: string | null;
    readonly title: string;
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
  "name": "isGroup"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "link"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v8 = [
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
        "name": "isGroup",
        "variableName": "isGroup"
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isGroup",
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
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAssignmentMutation",
    "selections": (v8/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v7/*: any*/),
      (v2/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateAssignmentMutation",
    "selections": (v8/*: any*/)
  },
  "params": {
    "cacheID": "0bd627de74a93cceb5f24e4aa1d245f8",
    "id": null,
    "metadata": {},
    "name": "CreateAssignmentMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAssignmentMutation(\n  $title: String!\n  $description: String\n  $startDate: String\n  $endDate: String\n  $link: String\n  $allowLateSubmissions: Boolean\n  $isGroup: Boolean\n  $courseId: ID!\n) {\n  createAssignment(title: $title, description: $description, startDate: $startDate, endDate: $endDate, link: $link, allowLateSubmissions: $allowLateSubmissions, courseId: $courseId, isGroup: $isGroup) {\n    id\n    title\n    description\n    startDate\n    endDate\n    link\n    allowLateSubmissions\n    courseId\n    isGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4fb7ddaee1152211e3691461346f332";

export default node;
