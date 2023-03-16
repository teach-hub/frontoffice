/**
 * @generated SignedSource<<3f837984c0bd104d40c074dabdec546f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type courseInfo$data = {
  readonly name: string;
  readonly period: number;
  readonly role: {
    readonly name: string | null;
    readonly parent: {
      readonly id: number | null;
      readonly name: string | null;
    } | null;
    readonly permissions: ReadonlyArray<string | null> | null;
  };
  readonly subject: {
    readonly active: boolean | null;
    readonly code: string;
    readonly id: string | null;
    readonly name: string;
  };
  readonly users: ReadonlyArray<{
    readonly file: string | null;
    readonly lastName: string | null;
    readonly name: string | null;
  } | null>;
  readonly year: number;
  readonly " $fragmentType": "courseInfo";
};
export type courseInfo$key = {
  readonly " $data"?: courseInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"courseInfo">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "courseInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
      "selections": [
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "year",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "period",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "RoleType",
      "kind": "LinkedField",
      "name": "role",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "RoleType",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "permissions",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Subject",
      "kind": "LinkedField",
      "name": "subject",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "active",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "CourseType",
  "abstractKey": null
};
})();

(node as any).hash = "2c889dcdef75fdabe96f2d8758b031d0";

export default node;
