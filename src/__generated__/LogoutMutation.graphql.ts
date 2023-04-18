/**
 * @generated SignedSource<<250327a01eccd6ffecf27d39afd9f628>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutMutation$variables = {
  token: string;
};
export type LogoutMutation$data = {
  readonly logout: {
    readonly token: string | null;
  } | null;
};
export type LogoutMutation = {
  response: LogoutMutation$data;
  variables: LogoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "Logout",
    "kind": "LinkedField",
    "name": "logout",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "LogoutMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LogoutMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "48c5b704d70c1732cb774172750bb634",
    "id": null,
    "metadata": {},
    "name": "LogoutMutation",
    "operationKind": "mutation",
    "text": "mutation LogoutMutation(\n  $token: String!\n) {\n  logout(token: $token) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "9b2cc3ca09d314e3e9ac3c4c3c4b9a53";

export default node;
