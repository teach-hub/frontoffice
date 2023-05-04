/**
 * @generated SignedSource<<9b1bbeb0f030793ebfee246f38bab35a>>
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
    "cacheID": "1d3380fe076820a251ebc8220efc3fa3",
    "id": null,
    "metadata": {},
    "name": "UseInviteMutation",
    "operationKind": "mutation",
    "text": "mutation UseInviteMutation(\n  $inviteId: String!\n) {\n  useInvite(inviteId: $inviteId) {\n    courseId\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fa47801fa181f69a85c758125c1b31b";

export default node;
