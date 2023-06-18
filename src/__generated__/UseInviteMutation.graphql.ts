/**
 * @generated SignedSource<<64defcb25f3b64a4121c9f866584d68d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UseInviteMutation$variables = {
  inviteId: string;
};
export type UseInviteMutation$data = {
  readonly useInvite: {
    readonly courseId: string | null;
  };
};
export type UseInviteMutation = {
  response: UseInviteMutation$data;
  variables: UseInviteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inviteId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "inviteId",
        "variableName": "inviteId"
      }
    ],
    "concreteType": "UseInviteResponse",
    "kind": "LinkedField",
    "name": "useInvite",
    "plural": false,
    "selections": [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UseInviteMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UseInviteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5a245c6af5d28aeefb4ef55829dbfce2",
    "id": null,
    "metadata": {},
    "name": "UseInviteMutation",
    "operationKind": "mutation",
    "text": "mutation UseInviteMutation(\n  $inviteId: ID!\n) {\n  useInvite(inviteId: $inviteId) {\n    courseId\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0bd24b74685bdceaf9cb68657813f2b";

export default node;
