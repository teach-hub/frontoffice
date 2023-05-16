/**
 * @generated SignedSource<<d78121a8a0001c900d3d96dd40a28ad0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AvailableRolesFragment$data = {
  readonly availableRoles: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "AvailableRolesFragment";
};
export type AvailableRolesFragment$key = {
  readonly " $data"?: AvailableRolesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AvailableRolesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AvailableRolesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RoleType",
      "kind": "LinkedField",
      "name": "availableRoles",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RootQueryType",
  "abstractKey": null
};

(node as any).hash = "d1ed5dcf12c70759549bc08227c8068c";

export default node;
