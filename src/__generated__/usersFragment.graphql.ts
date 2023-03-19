/**
 * @generated SignedSource<<b3e9089076a0478a33279cfeb718b5a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type usersFragment$data = {
  readonly name: string;
  readonly users: ReadonlyArray<{
    readonly file: string | null;
    readonly id: string | null;
    readonly lastName: string | null;
    readonly name: string | null;
  } | null>;
  readonly " $fragmentType": "usersFragment";
};
export type usersFragment$key = {
  readonly " $data"?: usersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"usersFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "usersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "file",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "CourseType",
  "abstractKey": null
};
})();

(node as any).hash = "4c3e76197e203953733445bb76e2c327";

export default node;
