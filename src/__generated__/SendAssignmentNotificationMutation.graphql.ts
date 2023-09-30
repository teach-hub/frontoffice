/**
 * @generated SignedSource<<17a326298edaaa154d91052814eb2a42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendAssignmentNotificationMutation$variables = {
  assignmentId: string;
  body: string;
  courseId: string;
  recipients: ReadonlyArray<string>;
};
export type SendAssignmentNotificationMutation$data = {
  readonly sendNotification: boolean;
};
export type SendAssignmentNotificationMutation = {
  response: SendAssignmentNotificationMutation$data;
  variables: SendAssignmentNotificationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignmentId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "body"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "recipients"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "assignmentId",
        "variableName": "assignmentId"
      },
      {
        "kind": "Variable",
        "name": "body",
        "variableName": "body"
      },
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "recipients",
        "variableName": "recipients"
      }
    ],
    "kind": "ScalarField",
    "name": "sendNotification",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SendAssignmentNotificationMutation",
    "selections": (v4/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "SendAssignmentNotificationMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "b5a7c2a02177756032203d61ff2aa0a8",
    "id": null,
    "metadata": {},
    "name": "SendAssignmentNotificationMutation",
    "operationKind": "mutation",
    "text": "mutation SendAssignmentNotificationMutation(\n  $recipients: [String!]!\n  $body: String!\n  $assignmentId: ID!\n  $courseId: ID!\n) {\n  sendNotification(recipients: $recipients, body: $body, assignmentId: $assignmentId, courseId: $courseId)\n}\n"
  }
};
})();

(node as any).hash = "0ac8e9232994a8b732af5d67c0ce06ff";

export default node;
