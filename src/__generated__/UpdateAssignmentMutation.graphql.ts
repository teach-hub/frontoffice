/**
 * @generated SignedSource<<8a8f091cd0678d645ec2a512ee662230>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAssignmentMutation$variables = {
  active?: boolean | null;
  allowLateSubmissions?: boolean | null;
  courseId: string;
  description?: string | null;
  endDate?: string | null;
  id: string;
  isGroup?: boolean | null;
  link?: string | null;
  startDate?: string | null;
  title?: string | null;
};
export type UpdateAssignmentMutation$data = {
  readonly updateAssignment: {
    readonly active: boolean | null;
    readonly allowLateSubmissions: boolean | null;
    readonly courseId: string;
    readonly description: string | null;
    readonly endDate: string | null;
    readonly id: string;
    readonly isGroup: boolean | null;
    readonly link: string | null;
    readonly startDate: string | null;
    readonly title: string | null;
  } | null;
};
export type UpdateAssignmentMutation = {
  response: UpdateAssignmentMutation$data;
  variables: UpdateAssignmentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "active"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "allowLateSubmissions"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "endDate"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isGroup"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "link"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v10 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "active",
        "variableName": "active"
      },
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
        "name": "id",
        "variableName": "id"
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
    "name": "updateAssignment",
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
        "name": "active",
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
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateAssignmentMutation",
    "selections": (v10/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v9/*: any*/),
      (v3/*: any*/),
      (v8/*: any*/),
      (v4/*: any*/),
      (v7/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "UpdateAssignmentMutation",
    "selections": (v10/*: any*/)
  },
  "params": {
    "cacheID": "b01834af5effa182c74ccea3ec9b7bfc",
    "id": null,
    "metadata": {},
    "name": "UpdateAssignmentMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateAssignmentMutation(\n  $id: ID!\n  $title: String\n  $description: String\n  $startDate: String\n  $endDate: String\n  $link: String\n  $allowLateSubmissions: Boolean\n  $active: Boolean\n  $isGroup: Boolean\n  $courseId: ID!\n) {\n  updateAssignment(id: $id, title: $title, description: $description, startDate: $startDate, endDate: $endDate, link: $link, allowLateSubmissions: $allowLateSubmissions, active: $active, isGroup: $isGroup, courseId: $courseId) {\n    id\n    title\n    description\n    startDate\n    endDate\n    link\n    allowLateSubmissions\n    courseId\n    active\n    isGroup\n  }\n}\n"
  }
};
})();

(node as any).hash = "00dcd30b8419563a8d6dd79351357461";

export default node;
